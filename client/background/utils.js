import { API_URL } from "./env.js";

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


export const fetchData = (url, options={}) => {
    return fetch(`${API_URL}${url}`,{
        ...options,
        headers: {
            ...(options.headers ?? {}),
            ...( options?.body ? {'Content-Type': 'application/json'} : {})
        }
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        } else {
            throw new Error(`Failed to fetch ${url}`);
        }
    })
    .then(response => ([response.data, response.error || null]))
    .catch(error => {
        console.log(error)
       return ([null, error?.message || error]) 
    })
}