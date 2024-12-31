
import { fetchAiResponse } from './ai.js';
import {
    getAvailableCredits,
    updateAvailableCredits, 
    getTotalCredits, 
    getCreditsData, 
    fetchAndStoreCreditsData
} from './credits.js'

import {
    clearUserDetails, 
    fetchAndStoreUserData, 
    getUserDetails,
    saveRandomUserId
} from './user.js'

import { fetchUserOrders } from './orders.js';

import { openLoginPage, trackEvent } from './utils.js';
import { Events, Messages } from './constants.js';




const handleCreditsMessages = async (message, sendResponse) => {

    try{
        if(message.type === Messages.BG_GET_AVAILABLE_CREDITS) {
            const credits = await getAvailableCredits();
            sendResponse({success: true, data:{credits} });
        }

        if(message.type === Messages.BG_UPDATE_AVAILABLE_CREDITS) {
            const credits = await updateAvailableCredits(message.credits);
            sendResponse({ success: true, data:{credits} })
        }

        if(message.type === Messages.BG_GET_TOTAL_CREDITS) {
            const credits = await getTotalCredits();
            sendResponse({success: true, data:{credits} })
        }

        if(message.type === Messages.BG_GET_CREDITS_DATA) {
            const data = await getCreditsData();
            sendResponse({success: true, data})
        }

        if(message.type === Messages.BG_FETCH_CREDITS_DATA) {
            await fetchAndStoreCreditsData();
            sendResponse({success: true})
        }

        if(message.type === Messages.BG_FETCH_USER_DETAILS) {
            const data = await fetchAndStoreUserData(message.email);
            sendResponse({success: true, data})
        }
        if(message.type === Messages.BG_CLEAR_USER_DETAILS) {
            await clearUserDetails();
            sendResponse({success: true})
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


const handleAiMessages = async (message, sendResponse) => {
    try{
        if(message.type = Messages.BG_GET_AI_RESPONSE){
            const data  = await fetchAiResponse(message.prompts);;
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

    if(message.type === Messages.BG_OPEN_LOGIN_PAGE){
        openLoginPage();
        return;
    }

    if(message.type === Messages.BG_TRACK_EVENT){
        trackEvent(message.event, message.data);
        sendResponse({success: true});
        return;
    }

    if([
        Messages.BG_GET_AI_RESPONSE
        ].includes(message.type)){
            handleAiMessages(message, sendResponse);
            return true;
    }
    

    if([
        Messages.BG_GET_AVAILABLE_CREDITS,
        Messages.BG_UPDATE_AVAILABLE_CREDITS,
        Messages.BG_GET_TOTAL_CREDITS,
        Messages.BG_GET_CREDITS_DATA,
        Messages.BG_FETCH_CREDITS_DATA,
        Messages.BG_FETCH_USER_DETAILS,
        Messages.BG_CLEAR_USER_DETAILS,
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


// opening the login page when the action btn is clicked
chrome.action.onClicked.addListener((tab) => {
   openLoginPage();
});

// listening for new updates available
chrome.runtime.onUpdateAvailable.addListener(() => {
    chrome.runtime.reload()
})


/**
 * Listen for extension installed
 */
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        trackEvent(Events.EXTENSION_INSTALLED);
        // we are creating this random userID only for MIX_PANEL to send events related to a specific id
        saveRandomUserId();
    }
})
