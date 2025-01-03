
const { getUserWithEmail } = require('../db/user');
const { getAccountWithUserId } = require('../db/accounts');
const { getPlanDetails } = require('../db/plan');
const { getIpData, createIpData, getRandomUserData } = require('../db/ip');
const { ACCOUNT_STATUS } = require('../constants/accounts');
const { Plans, FREE_CREDITS_PER_DAY } = require('../constants/plans');
const { generateRandomUserId } = require('../utils/otp');
const { setFreeUserIdInCookie } = require('../services/freeAccount');



const createUserData = ({
    userId,
    email,
    accountStatus,
    paymentDate,
    planId,
    credits,
    creditsUsed,
    creditsLastUsedAt
})=> {
    return {
        id: userId,
        email,
        credits: {
           credits_used: creditsUsed,
           last_used_at: creditsLastUsedAt,
           default_per_day: FREE_CREDITS_PER_DAY
        },
        account: {
            status: accountStatus,
            payment_date: paymentDate,
            plan_details: {
                plan_id: planId,
                credits: credits,
            }
        }
    }
}


/**
 * 
 * if have saved user id , then give data according to that
 * if no id is saved then check the ip-address, 
 *   if saved or not then use that data
 *   if not then create a newIp data with both randomId and ipAddress
 * 
 */

const getNonLoggedInUserDetails = async (res, ipAddress, exisitingRandomUserId) => {

    let randomUserId = exisitingRandomUserId;


    /**
     * For a complete new request who does not have any assigned random userId assigned in cookies
     * 1. check based upon ipaddress if exists or not, 
     *    if exists then assign that random id in that cookie
     *    else create a new random id which is not present in the db and then assign that random id in cookie
     */
    if(!randomUserId){
        const ipData = await getIpData(ipAddress);
        if(ipData){
            randomUserId = ipData.random_id 
        }else{
            // keep looping until the new id  is not present in the db
            while(true){
                randomUserId = generateRandomUserId();
                const randomUserDoc = await getRandomUserData(randomUserId);
                if(!randomUserDoc){
                    break;
                }
            }

        }
        setFreeUserIdInCookie(res, randomUserId);
    }


    /**
     * For  request with exxisting random user id
     */

    let randomUserData = await getRandomUserData(randomUserId);
    if(!randomUserData){
        randomUserData = await createIpData(ipAddress, randomUserId, 0);
    }

    return createUserData({
        userId: '',
        email: '',
        ipAddress,
        accountStatus: ACCOUNT_STATUS.active,
        paymentDate: null,
        planId: Plans.FREE.id,
        credits: Plans.FREE.credits,
        creditsUsed: randomUserData.used_credits,
        creditsLastUsedAt: randomUserData.last_used_at
    })
}




const getLoggedInUserDetails = async (email, ipAddress) => {
    const userDocument = await getUserWithEmail(email);
    if(!userDocument){
        throw {message: 'Invalid user', status:'404'}
    }

    const accountDocument = await getAccountWithUserId(String(userDocument.$id));
    if(!accountDocument){
        throw {message: 'Invalid account', status:'404'}
    }

    const planDetails = await getPlanDetails(accountDocument.plan_id)

    return createUserData({
        userId: userDocument.$id,
        email: userDocument.email,
        ipAddress,
        accountStatus: accountDocument.status,
        paymentDate: accountDocument.payment_date,
        planId: accountDocument.plan_id,
        credits: planDetails.credits,
        creditsUsed: accountDocument.credits_used,
        creditsLastUsedAt: accountDocument.credits_used_at
    })
}

module.exports ={
    getLoggedInUserDetails,
    getNonLoggedInUserDetails
}