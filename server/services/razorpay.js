const Razorpay = require('razorpay');

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });


  const createRazorPayPaymentLink = ({
    orderId, 
    price, 
    currency,
    description,
    userEmail,
    callbackUrl,
}) => {
    const expireIn = 16; // in min, maximum 16 min of validity
    const options = {
        amount: price,
        currency,
        description,
        customer: {
          email: userEmail,
        },
        notify: {
          email: true
        },
        notes: {
          orderId,
        },
        callback_url: callbackUrl,
        callback_method: "get",
        expire_by: Math.floor((Date.now() + (expireIn*60*1000))/1000) // converting in UNIX timestamp, unix is in seconds
      };


      return new Promise((res, rej) => {
        instance.paymentLink.create(options, function(err, paymentDetails) {
            if(err){
                rej(err)
            }
            res(paymentDetails)
          });
      })
  }


  const getPaymentDetails = (paymentId) => {
    return instance.payments.fetch(paymentId);
  }


  module.exports={
    createRazorPayPaymentLink,
    getPaymentDetails
  }