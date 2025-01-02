const express = require('express');
const { getAiResponse, checkAndUpdateNonLoggedInUserUsage, checkAndUpdateLoggedInUserUsage } = require('../controller/ai');
const { getRequestIpAddress } = require('../utils/ip');
const { silenceAuthMiddleware } = require('../middleware/authMiddleware');
const { getFreeUserIdFromCookie } = require('../services/freeAccount');

const router = express.Router();

router.post('/', silenceAuthMiddleware , async (req, res) => {
    try {
        const ipAddress = getRequestIpAddress(req);
        const randomUserId = getFreeUserIdFromCookie(req);
        const {prompts, email} = req.body;
        if(email && req.user){
            await checkAndUpdateLoggedInUserUsage(email);   
        }else{
            await checkAndUpdateNonLoggedInUserUsage(ipAddress, randomUserId)
        }
        const aiResponse = await getAiResponse(prompts);
        res.json({
            data: {
                result: aiResponse
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(error.status ?? 500).json({ 
            error: {
                message: error.message || 'Somthing went wrong in ai response',
                action: error?.action || ''
            }
        });
    }
});

module.exports = router;