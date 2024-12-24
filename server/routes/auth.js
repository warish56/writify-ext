
const express = require('express');
const { loginUser , verifyOtp, createUserInDbIfNotExists } = require('../controller/auth');
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const {email} = req.body;
        await loginUser(email);
        res.json({
            data: {
                message: 'Otp sent successfully'
            },
            error: null
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(error.status ?? 500).json({ 
            error: {
                message: error.message || 'Somthing went wrong in login'
            }
        });
    }
})

router.post('/verify-otp', async (req, res) => {
    try {
        const {email, otp} = req.body;
        await verifyOtp(email, otp);
        await createUserInDbIfNotExists(email);
        res.json({
            data: {
                message: 'User authenticated'
            },
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(error.status ?? 500).json({ 
            error: {
                message: error.message || 'Somthing went wrong in login'
            }
        });
    }
})

module.exports = router