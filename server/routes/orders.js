const express = require('express');
const { createNewOrder, getOrderDetails } = require('../controller/orders');

const router = express.Router();


router.post('/create-order', async (req, res) => {
    try {
        const { userId } = req.body; 
       const order =  await createNewOrder(userId);
        res.json({
            data: {
                order_id: order.$id
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