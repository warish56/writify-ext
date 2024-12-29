import { DEFAULT_CREDITS_PER_DAY } from './constants.js';
import {  fetchAndStoreUserData, getUserDetails } from './user.js';
import {daysDifference, isNextDay} from './utils.js'

const CREDITS_USED = 'cred_used';
const TOTAL_CREDITS = 'cred_total';
const CREDITS_INIT_TIMESTAMP = 'cred_init_timestamp';


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
    return response;

}

export const fetchAndStoreCreditsData = async () => {
    try{
    let userDetails = await getUserDetails();
    if(userDetails?.email){
        const [data, error] = await fetchAndStoreUserData(userDetails?.email);
        userDetails = data ? {...data} : data;
    }

    const dbCreditsData = await getCreditsData();
    let hasOneDayPassed = true;
    let hasOneMonthPassed = true;

    // if one day has passed , then reful the available credits
    if(dbCreditsData.initTimestamp){
        hasOneDayPassed = isNextDay(dbCreditsData.initTimestamp, Date.now());
    }

    // if one month has passed from the last payment date, then assign the free credits only
    if(userDetails?.account){
        const lastePaymentDate = userDetails?.account.payment_date;
        hasOneMonthPassed = daysDifference(lastePaymentDate) > 28;
    }
    

    console.log("==CREDITS FETCHED FROM SERVER ===",{ dbCreditsData, userDetails, hasOneDayPassed, })

    await chrome.storage.sync.set({ 
           [TOTAL_CREDITS]: hasOneMonthPassed ? DEFAULT_CREDITS_PER_DAY :  (userDetails?.account?.plan_details?.credits ?? DEFAULT_CREDITS_PER_DAY),

        // if one day has passed then reset the credits used
        ...((hasOneDayPassed) ? {
            [CREDITS_USED] : 0,
            [CREDITS_INIT_TIMESTAMP] : Date.now()
        } : {}),

        // if initially the timestamp is not set then add the current timestamp
        ...(!dbCreditsData.initTimestamp ? {
            [CREDITS_INIT_TIMESTAMP] : Date.now()
        } : {})
        
    })
}catch(err){
    console.log("==err==",err)
}
    
}