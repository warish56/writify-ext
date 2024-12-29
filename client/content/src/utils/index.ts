
type dbounceFunc = () => void

export const debounce = (func:Function, wait:number) => {
    let timeout:number;
    return function(this:dbounceFunc, ...args:any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

export const copyToClipBoard = (text:string) => {
    const type = 'text/plain';
    const clipboardItem = new ClipboardItem({
        [type]: new Blob([text], { type })
    })
    return navigator.clipboard.write([clipboardItem]);
}

export const sendMessageToWorker = (message:string, data:Record<string, unknown> = {}) => {
    const appId = chrome.runtime.id;
    return chrome.runtime.sendMessage({appId, type: message, ...data});
}