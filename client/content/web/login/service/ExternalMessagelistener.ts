

type callbackFunc = (message:string) => void;

type Request = {
    appId: string;
    message:string;
    targetLocation?: string;
}

export const listenToExternalMessages = (callback:callbackFunc) => {

    const handleMessage = function(request:Request, _:unknown, sendResponse:(response:unknown) => void) {
        const appId = chrome.runtime.id;
         const mineLocations = ['web_app', 'all'];


         // only messages from  our extension can be accepted
         if( request?.appId !== appId || !mineLocations.includes(request?.targetLocation || '')){
             return;
         }
 
        callback(request.message);
        sendResponse({success: true});
        return;
    }
    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
        chrome.runtime.onMessage.removeListener(handleMessage)
    }
}