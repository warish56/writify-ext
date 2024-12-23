
export const sendMessageToWorker = <T>(message:string, data:Record<string, unknown> = {}) => {
    const appId = chrome.runtime.id;
    return new Promise<T>((res, rej) => {
        chrome.runtime.sendMessage({appId, type: message, ...data},(response) => {
            res(response)
        });
    })
}