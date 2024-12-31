const OpenAI = require("openai");
const { getIpData, createIpData, updateIpCredits } = require("../db/ip");
const { Plans } = require("../constants/plans");
const { isNextDay } = require("../utils/date");
const { getUserWithEmail } = require("../db/user");
const { getAccountWithUserId, updateAccountCredits } = require("../db/accounts");

const openai = new OpenAI({
  apiKey: process.env.GPT_API_KEY
});



const checkAndUpdateNonLoggedInUserUsage = async (ipAddress) => {
    let ipData = await getIpData(ipAddress);
    if(!ipData){
      throw {message: "Free user does not exists", status: 404};
    }
    // if one day has pssed from its last_used value then reset the new credits value to 1 
    const hasOneDayPassedFromLastUsed = isNextDay(ipData.last_used_at, Date.now());
    const newCredits = hasOneDayPassedFromLastUsed ? 1 : ipData.used_credits + 1;
    if(newCredits > Plans.FREE.credits){
       throw {message: "Credits expired for the day", status: 400, action: 'REFRESH'}
    }
    await updateIpCredits(ipData.$id, newCredits);
}

const checkAndUpdateLoggedInUserUsage = async (email) => {
  const userDetails = await getUserWithEmail(email);
  if(!userDetails){
    throw {message: "User does not exists", status: 404};
  }

  const accountDetails = await getAccountWithUserId(userDetails.$id);
  if(!accountDetails){
    throw {message: "User account not found", status: 404};
  }

  const currentPlan = Object.values(Plans).find(plan => plan.id == accountDetails.plan_id);
  const prevCreditsUsed = accountDetails.credits_used;
  // if one day has pssed from its last_used value then reset the new credits value to 1 
  const hasOneDayPassedFromLastUsed = isNextDay(accountDetails.credits_used_at, Date.now());
  const newCredits = hasOneDayPassedFromLastUsed ? 1 : prevCreditsUsed + 1;
  if(newCredits > currentPlan.credits){
     throw {message: "Credits expired for the day", status: 400, action: 'REFRESH'}
  }
  await updateAccountCredits(accountDetails.$id, newCredits);
}

const getAiResponse = async (prompts) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: prompts,
      });

    return completion.choices[0].message.content;

}

module.exports = {
    getAiResponse,
    checkAndUpdateNonLoggedInUserUsage,
    checkAndUpdateLoggedInUserUsage
}