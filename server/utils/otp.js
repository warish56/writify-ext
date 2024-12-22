

const generateOtp = (length=6) => {
    let opt = '';

    for(let i=0; i<length; i++){
        otp +=  Math.round(Math.random() % 9);
    }

    return otp;
}

module.exports = {
    generateOtp
}