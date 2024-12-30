import { BG_TRACK_EVENT } from "../constants/worker";

export const sendMessageToWorker = <T>(message:string, data:Record<string, unknown> = {}) => {
    const appId = chrome.runtime.id;
    return new Promise<T>((res) => {
        chrome.runtime.sendMessage({appId, type: message, ...data},(response:T) => {
            res(response)
        });
    })
}

export const daysDifference = (givenDate:Date) => {
    const d1 = new Date(givenDate).getTime();
    const d2 = new Date().getTime();
    return ((d2-d1)/1000)/60/60/24;
}


export const sendTrackingEvent = (event:string, data={}) => {
    sendMessageToWorker(BG_TRACK_EVENT, {event, data})
}

export const removeParams = () => {
    const url = new URL(location.href);
    url.searchParams.delete('payment');
    window.history.pushState({}, '',url.toString());
}

