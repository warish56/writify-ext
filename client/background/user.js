import { Routes } from './constants.js';
import { fetchData } from './utils.js';

const USER_DATA = 'user_data';

export const fetchUserData = (email) => {
    return fetchData(`${Routes.userDetails}?email=${email}`);
}

export const getUserDetails = async () => {
    const data = await chrome.storage.sync.get([USER_DATA]);
    return data[USER_DATA];
}

export const clearUserDetails = async () => {
    await chrome.storage.sync.remove([USER_DATA]);
    return;
}



export const fetchAndStoreUserData = async (email) => {
    const [data, error] = await fetchUserData(email);
    await chrome.storage.sync.set({ 
        [USER_DATA]: data
    })
    return [data, error];

}