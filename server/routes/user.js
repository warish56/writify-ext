const express = require('express');
const { getUserWithEmail } = require('../db/user');
const { getAccountWithUserId } = require('../db/accounts');
const { getPlanDetails } = require('../db/plan');

const router = express.Router();


router.get('/details', async (req, res) => {
    try {
        const { email } = req.query; 
        const userDocument = await getUserWithEmail(email);
        if(!userDocument){
            throw {message: 'Invalid user', status:'404'}
        }

        const accountDocument = await getAccountWithUserId(String(userDocument.$id));
        if(!accountDocument){
            throw {message: 'Invalid account', status:'404'}
        }

        const planDetails = await getPlanDetails(accountDocument.plan_id)

        res.json({
            data: {
                id: userDocument.$id,
                email: userDocument.email,
                account: {
                    status: accountDocument.status,
                    payment_date: accountDocument.payment_date,
                    plan_details: {
                        plan_id: accountDocument.plan_id,
                        credits: planDetails.credits
                    }
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