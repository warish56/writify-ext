import { API_URL, MIXPANEL_PROJECT_ID, MIXPANEL_TOKEN, NODE_ENV } from "./env.js";
import { getToken } from "./token.js";
import { getRandomUserId, getUserDetails } from "./user.js";

export const generateRandomUserId = () => {
    let id='';
    for(let i=0; i<2; i++){
        id += Math.random().toString(36).substring(2, 15);
    }
    return id;
};

export const isNextDay = (timestamp1, timestamp2) => {
    const d1 = new Date(timestamp1);
    const d2 = new Date(timestamp2);

    const startDate = new Date(d1.getFullYear(), d1.getMonth(), d1.getDay());
    const endDate = new Date(d2.getFullYear(), d2.getMonth(), d2.getDay());

    return endDate > startDate;

}

export const daysDifference = (givenDate) => {
    const d1 = new Date(givenDate);
    const d2 = new Date();
    return ((d2-d1)/1000)/60/60/24;
}


export const openLoginPage = () => {
    chrome.tabs.create({
        url: chrome.runtime.getURL("content/dist/web/web/login/index.html")
    });
}


export const fetchData = async (url, options={}) => {
    return fetch(`${API_URL}${url}`,{
        ...options,
        headers: {
            ...(options.headers ?? {}),
            ...( options?.body ? {'Content-Type': 'application/json'} : {}),
        }
    })
    .then(res => {
        return res.json(); 
    })
    .then(response => ([response.data, response.error || null]))
    .catch(error => {
        console.log(error)
       return ([null, error?.message || error]) 
    })
}

export const trackEvent = async (event, extraData={}) => {
    if(NODE_ENV !== 'production'){
        return;
    }
    const userDetails = await getUserDetails();
    const randomUserId = await getRandomUserId();
    fetch(`https://api.mixpanel.com/import?strict=1&project_id=${MIXPANEL_PROJECT_ID}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            accept: 'application/json',
            authorization: `Basic ${MIXPANEL_TOKEN}`
        },
        body: JSON.stringify([{
            event: event,
            properties: {
                extension_id: chrome.runtime.id,
                time: Date.now(),
                distinct_id: userDetails?.id ??  randomUserId,
                ...(userDetails ?  {
                    user_id: userDetails.id,
                    email: userDetails.email,
                }: {}),
                ...(extraData ?? {}),
                "$insert_id": `${Date.now()}`
            }
        }])
    }).then(async res => {
        if(res.ok){
            console.log("Event tracked successfully");
        }else{
            const resJson = await res.json();
            throw resJson;
        }
    }).catch(err => {
        console.error("Error tracking event:", err);
    })
}

export const sendMessageToContentScript = async(message) => {
    const appId = chrome.runtime.id;
    const tabs = await chrome.tabs.query({});
    for(const tab of tabs){
        try{
            await chrome.tabs.sendMessage(tab.id, {message, appId,  targetLocation: 'all'});
        }catch(err){}
    }
}