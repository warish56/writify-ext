import { Routes } from './constants.js';
import { fetchData, generateRandomUserId } from './utils.js';

const USER_DATA = 'user_data';
const RANDOM_USER_ID = 'random_user_id';


export const saveRandomUserId = async () => {
    const randomUserId = generateRandomUserId();
    await chrome.storage.sync.set({ 
        [RANDOM_USER_ID]: randomUserId
    })
}

export const getRandomUserId = async () => {
    const data = await chrome.storage.sync.get([RANDOM_USER_ID]);
    return data[RANDOM_USER_ID];
}

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
    const existingUserDetails = await getUserDetails();
    const [data, error] = await fetchUserData( email || existingUserDetails?.email || '');
    await chrome.storage.sync.set({ 
        [USER_DATA]: data
    })
    return [data, error];

}