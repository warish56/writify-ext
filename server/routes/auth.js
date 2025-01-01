
const express = require('express');
const { loginUser , verifyOtp, createUserInDbIfNotExists } = require('../controller/auth');
const { generateJwtToken } = require('../utils/jwt');
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
        console.error('Error:', error, error?.response?.body);
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
        const userDetails = await createUserInDbIfNotExists(email);
        const jwtToken = generateJwtToken(userDetails.$id, userDetails.email);
        res.json({
            data: {
                jwtToken,
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