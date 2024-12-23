const { createAccount } = require("../db/accounts");
const { createOrUpdateOtp, getOtpWithEmail } = require("../db/otp");
const { createUser } = require("../db/user");
const { sendMail } = require("../services/mailer");
const { generateOtp } = require("../utils/otp")


const loginUser = async (email) => {
    const otp = generateOtp();
    await createOrUpdateOtp(email, otp);
    await sendMail(email, 'WriteAi Login OTP',  'otp', `
        <h1>OTP : ${otp}</h1>
    `);    
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

const createUserInDb = async (email) => {
    const userDocument = await createUser(email);
    await createAccount(String(userDocument.$id));
}

module.exports = {
    loginUser,
    verifyOtp,
    createUserInDb
}