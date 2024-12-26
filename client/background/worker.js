
import { API_URL, Messages, Routes } from './constants.js';
import {getAvailableCredits, updateAvailableCredits, getTotalCredits, getCreditsData, fetchAndStoreCreditsData} from './credits.js'
import { fetchUserOrders } from './orders.js';
import {fetchAndStoreUserData, getUserDetails} from './user.js'
import { openLoginPage } from './utils.js';

const fetchAiResponse = async (text, prompt, sendResponse) => {
    fetch(`${API_URL}${Routes.AI}`, {
        method: 'POST',
        body: JSON.stringify({text, prompt}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        } else {
            throw new Error('Failed to fetch AI response');
        }
    })
    .then(response => sendResponse([response.data, null]))
    .catch(error => sendResponse([null, error]));
}


const handleCreditsMessages = async (message, sendResponse) => {

    try{
        if(message.type === Messages.BG_GET_AVAILABLE_CREDITS) {
            const credits = await getAvailableCredits();
            sendResponse({success: true, credits});
        }

        if(message.type === Messages.BG_UPDATE_AVAILABLE_CREDITS) {
            const credits = await updateAvailableCredits(message.credits);
            sendResponse({success: true, credits})
        }

        if(message.type === Messages.BG_GET_TOTAL_CREDITS) {
            const credits = await getTotalCredits();
            sendResponse({success: true, credits})
        }

        if(message.type === Messages.BG_GET_CREDITS_DATA) {
            const data = await getCreditsData();
            sendResponse({success: true, ...data})
        }

        if(message.type === Messages.BG_FETCH_CREDITS_DATA) {
            await fetchAndStoreCreditsData();
            sendResponse({success: true})
        }

        if(message.type === Messages.BG_FETCH_USER_DETAILS) {
            const data = await fetchAndStoreUserData(message.email);
            sendResponse({success: true, data})
        }

        if(message.type === Messages.BG_GET_USER_DETAILS) {
            const data = await getUserDetails();
            sendResponse({success: true, data})
        }

    }catch(err){
        sendResponse({success: false, error:err});
    }

}


const handleOrdersMessages = async (message, sendResponse) => {
    try{
        if(message.type = Messages.BG_FETCH_USER_ORDERS){
            const data  = await fetchUserOrders(message.userId);
            sendResponse({success: true, data})
            return true;
        }
    }catch(err){
        sendResponse({success: false, error:err});
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const appId = chrome.runtime.id;

    // only messages from  our extension can be accepted
    if( message.appId !== appId){
        return;
    }

    if(message.type === Messages.BG_GET_AI_RESPONSE) {
        fetchAiResponse(message.text, message.prompt, sendResponse);
        return true;
    }

    if(message.type === Messages.BG_OPEN_LOGIN_PAGE){
        openLoginPage();
        return;
    }


    if([
        Messages.BG_GET_AVAILABLE_CREDITS,
        Messages.BG_UPDATE_AVAILABLE_CREDITS,
        Messages.BG_GET_TOTAL_CREDITS,
        Messages.BG_GET_CREDITS_DATA,
        Messages.BG_FETCH_CREDITS_DATA,
        Messages.BG_FETCH_USER_DETAILS,
        Messages.BG_GET_USER_DETAILS
        ].includes(message.type)){
            handleCreditsMessages(message, sendResponse);
            return true;
    }

    if([
        Messages.BG_FETCH_USER_ORDERS
        ].includes(message.type)){
            handleOrdersMessages(message, sendResponse);
            return true;
    }

});


chrome.action.onClicked.addListener((tab) => {
   openLoginPage();
});