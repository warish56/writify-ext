import { API_URL, Routes } from './constants.js';

const USER_DATA = 'user_data';

export const fetchUserData = (email) => {
    return fetch(`${API_URL}${Routes.userDetails}?email=${email}`)
    .then(res => {
        if(res.ok) {
            return res.json();
        } else {
            throw new Error('Failed to fetch AI response');
        }
    })
    .then(response => ([response.data, response.error || null]))
    .catch(error => ([null, error]) )
}

export const getUserDetails = async () => {
    const data = await chrome.storage.sync.get([USER_DATA]);
    return data[USER_DATA];
}


export const fetchAndStoreUserData = async (email) => {
    const [data, error] = await fetchUserData(email);
    if(data){
        await chrome.storage.sync.set({ 
            [USER_DATA]: data
        })
    }
    return [data, error];

}