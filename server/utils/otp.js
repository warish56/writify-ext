

const generateOtp = (length=6) => {
    let otp = '';

    for(let i=0; i<length; i++){
        otp +=  Math.floor(Math.random() * 10);
    }

    return Number(otp);
}


const generateRandomUserId = () => {
    let id='';
    for(let i=0; i<2; i++){
        id += Math.random().toString(36).substring(2, 15);
    }
    return id;
};


module.exports = {
    generateOtp,
    generateRandomUserId
}