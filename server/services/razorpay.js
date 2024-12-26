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
        receipt:orderId
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