
const mailgun = require("mailgun-js");
const mg = mailgun({ 
    apiKey: process.env.MAIL_GUN_API_KEY, 
    domain: "appSphere.com" 
});


const sendMail = (email, subject, text) => {

    const data = {
        from: "appsphere.com",
        to: email,
        subject: subject,
        text,
    };

    return new Promise((res, rej) => {
        mg.messages().send(data, (error, body) => {
            if (error) {
                rej(error)
            } else {
                res(body)
            }
        });
    })
}

module.exports ={
    sendMail
}



