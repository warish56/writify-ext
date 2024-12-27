

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