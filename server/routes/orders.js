const express = require('express');
const { createNewOrder, getOrderDetails, verifyPayment, getUserOrdersList } = require('../controller/orders');

const router = express.Router();



router.get('/verify-payment', async (req, res) => {
    try{
        const { 
            razorpay_payment_id, 
            razorpay_order_id, 
            razorpay_signature, 
            orderId,
            planId,
            userId 
        } = req.query;

        const status = await verifyPayment({
            orderId,
            planId,
            userId,
            razorPayPaymentId: razorpay_payment_id
        })
       res.redirect(`chrome-extension://${process.env.EXTENSION_ID}${process.env.PLANS_PAGE_PATH}?payment=${status}`);
       
    }catch (error) {
        console.error('Error:', error);
        res.status(error.status ?? 500).json({ 
            error: {
                message: error.message || 'Somthing went wrong in orders'
            }
        });
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

router.post('/list', async (req, res) => {
    try {
        const { userId } = req.body;
        const result = await getUserOrdersList(userId);
        res.json({
            data: {
                list:result
            }
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(error.status ?? 500).json({ 
            error: {
                message: error.message || 'Somthing went wrong in orders list'
            }
        });
    }
});



module.exports = router;