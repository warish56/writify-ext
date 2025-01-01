
const TOKEN_DATA = 'token_data';

export const setToken = async (token) => {
    await chrome.storage.sync.set({ 
        [TOKEN_DATA]: token
    })
}

export const getToken = async () => {
    const data = await chrome.storage.sync.get([TOKEN_DATA]);
    return data[TOKEN_DATA];
}

export const clearToken = async () => {
    await chrome.storage.sync.remove([TOKEN_DATA]);
}