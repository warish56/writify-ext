const { createAccount } = require("../db/accounts");
const { createOrUpdateOtp, getOtpWithEmail } = require("../db/otp");
const { createUser, getUserWithEmail } = require("../db/user");
const { getOtpMarkup } = require("../markup/otpMail");
const { sendMail } = require("../services/mailer");
const { generateOtp } = require("../utils/otp")


const loginUser = async (email) => {
    const otp = generateOtp();
    await createOrUpdateOtp(email, otp);
    await sendMail(email, 'AIMagicText Login OTP',  'OTP', getOtpMarkup({otp}));    
}

const verifyOtp = async (email, otp) => {
    const document = await getOtpWithEmail(email);
    if(!document){
        throw {message: "Invalid email", status: 404}
    }

    if(document.otp != otp){
        throw {message: "Invalid otp", status: 400}
    }

    return true;
}

const createUserInDbIfNotExists = async (email) => {
    const userWithEmail = await getUserWithEmail(email);
    if(userWithEmail){
        return userWithEmail;
    }
    const userDocument = await createUser(email);
    const document = await createAccount(String(userDocument.$id));
    return document;
}

module.exports = {
    loginUser,
    verifyOtp,
    createUserInDbIfNotExists
}