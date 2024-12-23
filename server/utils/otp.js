

const generateOtp = (length=6) => {
    let otp = '';

    for(let i=0; i<length; i++){
        otp +=  Math.floor(Math.random() * 10);
    }

    return Number(otp);
}

module.exports = {
    generateOtp
}