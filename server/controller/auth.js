const { createOrUpdateOtp, getOtpWithEmail } = require("../db/otp");
const { sendMail } = require("../services/mailer");
const { generateOtp } = require("../utils/otp")


const loginUser = async (email) => {
    const otp = generateOtp();
    await createOrUpdateOtp(email, otp);
    await sendMail(email, 'OTP for login', `
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

module.exports = {
    loginUser,
    verifyOtp
}