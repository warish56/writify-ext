import { API_URL, Routes, DEFAULT_CREDITS_PER_DAY } from './constants.js';
import {isNextDay} from './utils.js'

const CREDITS_USED = 'cred_used';
const TOTAL_CREDITS = 'cred_total';
const CREDITS_INIT_TIMESTAMP = 'cred_init_timestamp'

export const fetchCreditsData = () => {
    return fetch(`${API_URL}${Routes.credits}`)
    .then(res => {
        if(res.ok) {
            return res.json();
        } else {
            throw new Error('Failed to fetch AI response');
        }
    })
    .then(response => ([response.data, null]))
    .catch(error => ([null, error]) )
}


export const updateAvailableCredits = async (credits) => {
    await  chrome.storage.sync.set({ [CREDITS_USED]: credits })
    return credits;
}

export const getTotalCredits = async () => {
    const totalCredits = await  chrome.storage.sync.get([TOTAL_CREDITS]);
    return totalCredits.key ?? 0;
}

export const getAvailableCredits = async () => {
    const creditsUsed = await  chrome.storage.sync.get([CREDITS_USED]);
    const totalCredits = await  chrome.storage.sync.get([TOTAL_CREDITS]);
    return totalCredits.key - (creditsUsed?.key ?? 0);
}

export const getCreditsData = async () => {
    const data = await chrome.storage.sync.get([CREDITS_USED, TOTAL_CREDITS, CREDITS_INIT_TIMESTAMP]);
    const response = {
        totalCredits: data[TOTAL_CREDITS],
        usedCredits: data[CREDITS_USED] ?? 0,
        availableCredits: data[TOTAL_CREDITS] - (data[CREDITS_USED] ?? 0),
        initTimestamp: data[CREDITS_INIT_TIMESTAMP] ?? null
    }

    console.log("==GETTING CREDITS DATA ===",{response})
    return response;

}

export const fetchAndStoreCreditsData = async () => {
    const [data, error] = await fetchCreditsData();
    const dbCreditsData = await getCreditsData();
    let hasOneDayPassed = true;
    if(dbCreditsData.initTimestamp){
        hasOneDayPassed = isNextDay(dbCreditsData.initTimestamp, Date.now());
    }

    console.log("==CREDITS FETCHED FROM SERVER ===",{data, dbCreditsData, error, hasOneDayPassed, })

    if(data){
        await chrome.storage.sync.set({ 
            [TOTAL_CREDITS]: data.totalCredits,

            // if one day has passed then reset the credits used
            ...(hasOneDayPassed ? {
                [CREDITS_USED] : 0,
                [CREDITS_INIT_TIMESTAMP] : Date.now()
            } : {}),

            // if initially the timestamp is not set then add the current timestamp
            ...(!dbCreditsData.initTimestamp ? {
                [CREDITS_INIT_TIMESTAMP] : Date.now()
            } : {})
            
        })
    }

    if(error){
        await chrome.storage.sync.set({ 
            [TOTAL_CREDITS]: DEFAULT_CREDITS_PER_DAY,
        })
    }
}