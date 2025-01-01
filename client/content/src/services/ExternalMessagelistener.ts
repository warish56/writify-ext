

type callbackFunc = (message:string) => void;

type Request = {
    appId: string;
    message:string;
    targetLocation?: string;
}

export const listenToExternalMessages = (callback:callbackFunc) => {

    const handleMessage = function(request:Request, _:unknown, sendResponse:(response:unknown) => void) {
        const mineLocations = ['content_script', 'all'];
        const appId = chrome.runtime.id;
        // only messages from  our extension can be accepted
        if( request.appId !== appId || !mineLocations.includes(request?.targetLocation || '') ){
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