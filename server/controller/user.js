
const { getUserWithEmail } = require('../db/user');
const { getAccountWithUserId } = require('../db/accounts');
const { getPlanDetails } = require('../db/plan');
const { getIpData, createIpData } = require('../db/ip');
const { ACCOUNT_STATUS } = require('../constants/accounts');
const { Plans } = require('../constants/plans');



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
           last_used_at: creditsLastUsedAt
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


const getNonLoggedInUserDetails = async (ipAddress) => {
    let ipData = await getIpData(ipAddress);
    if(!ipData){
        ipData = await createIpData(ipAddress, 0);
    }
    return createUserData({
        userId: '',
        email: '',
        ipAddress,
        accountStatus: ACCOUNT_STATUS.active,
        paymentDate: null,
        planId: Plans.FREE.id,
        credits: Plans.FREE.credits,
        creditsUsed: ipData.used_credits,
        creditsLastUsedAt: ipData.last_used_at
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