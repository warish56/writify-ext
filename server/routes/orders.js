const express = require('express');
const { createNewOrder, getOrderDetails, markOrderCompleted, markOrderFailed } = require('../controller/orders');
const { getPaymentDetails } = require('../services/razorpay');

const router = express.Router();



router.get('/verify-payment', async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderId } = req.query;
     // Fetch payment details from Razorpay API if needed
    // Validate payment status using Razorpay's Orders API
    const paymentData = await getPaymentDetails(razorpay_payment_id);
    console.log("== payment data redirect==",{paymentData, razorpay_order_id, razorpay_payment_id, orderId, razorpay_signature})
    if(paymentData.status === 'captured'){
        await markOrderCompleted(orderId);
    }else{
        await markOrderFailed(orderId);
    }
})


router.post('/create-order', async (req, res) => {
    try {
        const { userId, planId } = req.body; 
        const orderDetails =  await createNewOrder(userId, planId);
        res.json({
            data: {
                ...orderDetails
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(error.status ?? 500).json({ 
            error: {
                message: error.message || 'Somthing went wrong in orders'
            }
        });
    }
});


router.post('/update-order', async (req, res) => {
    try {
        const { orderId } = req.body;
    } catch (error) {
        console.error('Error:', error);
        res.status(error.status ?? 500).json({ 
            error: {
                message: error.message || 'Somthing went wrong in orders'
            }
        });
    }
});

router.post('/order-status', async (req, res) => {
    try {
        const { orderId } = req.body;
        const orderDocument = await getOrderDetails(orderId);
        res.json({
            data: {
                order: {
                    id: orderDocument.$id,
                    payment_status: orderDocument.payment_status,
                    user_id: orderDocument.user_id
                }
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(error.status ?? 500).json({ 
            error: {
                message: error.message || 'Somthing went wrong in orders'
            }
        });
    }
});


module.exports = router;