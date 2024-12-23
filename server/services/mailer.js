
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendMail = async (email, subject, text, html) => {
   
    const msg = {
        to: email, // Change to your recipient
        from: 'mdwarish56@gmail.com', // Change to your verified sender
        subject: subject,
        text,
        html,
      }
      return sgMail .send(msg)
}
       

module.exports ={
    sendMail
}



