import { DEFAULT_CREDITS_PER_DAY } from './constants.js';
import { getUserDetails } from './user.js';
import {daysDifference, isNextDay} from './utils.js'

const CREDITS_USED = 'cred_used';
const TOTAL_CREDITS = 'cred_total';


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
    const data = await chrome.storage.sync.get([CREDITS_USED, TOTAL_CREDITS]);
    const response = {
        totalCredits: data[TOTAL_CREDITS],
        usedCredits: data[CREDITS_USED] ?? 0,
        availableCredits: data[TOTAL_CREDITS] - (data[CREDITS_USED] ?? 0),
    }
    return response;

}

export const fetchAndStoreCreditsData = async () => {
    try{
    const userDetails = await getUserDetails();
    const dbCreditsData = await getCreditsData();
    const hasOneDayPassed = isNextDay(userDetails.credits.last_used_at, Date.now());
    let hasOneMonthPassed = true;

  

    // if one month has passed from the last payment date, then assign the free credits only
    if(userDetails?.account?.payment_date){
        const lastePaymentDate = userDetails?.account.payment_date;
        hasOneMonthPassed = daysDifference(lastePaymentDate) > 28;
    }
    

    await chrome.storage.sync.set({ 
           [TOTAL_CREDITS]: hasOneMonthPassed ? DEFAULT_CREDITS_PER_DAY :  (userDetails?.account?.plan_details?.credits ?? DEFAULT_CREDITS_PER_DAY),
           [CREDITS_USED] : userDetails?.credits.credits_used ?? 0,
        // if one day has passed then reset the credits used
        ...((hasOneDayPassed) ? {
            [CREDITS_USED] : 0,
        } : {}),
        
    })
}catch(err){
    console.log("==err==",err)
}
    
}