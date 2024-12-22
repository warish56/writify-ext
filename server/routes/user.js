const express = require('express');
const { getUserWithEmail } = require('../db/user');
const { getAccountWithUserId } = require('../db/accounts');

const router = express.Router();


router.get('/details', async (req, res) => {
    try {
        const { email } = req.query; 
        const userDocument = await getUserWithEmail(email);
        if(!userDocument){
            throw {message: 'Invalid user', status:'404'}
        }
        const accountDocument = await getAccountWithUserId(userDocument.$id);
        if(!accountDocument){
            throw {message: 'Invalid account', status:'404'}
        }

        res.json({
            data: {
                id: userDocument.$id,
                email: userDocument.email,
                account: {
                    payment_date: accountDocument.payment_date,
                    plan_id: accountDocument.plan_id
                }
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(error.status ?? 500).json({ 
            error: {
                message: error.message || 'Somthing went wrong in details'
            }
        });
    }
});

module.exports = router;