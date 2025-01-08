const express = require('express');
const { getAiResponse, checkAndUpdateNonLoggedInUserUsage, checkAndUpdateLoggedInUserUsage } = require('../controller/ai');
const { getRequestIpAddress } = require('../utils/ip');
const { silenceAuthMiddleware } = require('../middleware/authMiddleware');
const { getFreeUserIdFromCookie } = require('../services/freeAccount');

const router = express.Router();

router.post('/', silenceAuthMiddleware , async (req, res) => {
    try {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        const ipAddress = getRequestIpAddress(req);
        const randomUserId = getFreeUserIdFromCookie(req);
        const {prompts, email} = req.body;

        if(email && req.user){
            await checkAndUpdateLoggedInUserUsage(email);   
        }else{
            await checkAndUpdateNonLoggedInUserUsage(ipAddress, randomUserId)
        }
        await getAiResponse(res, prompts);
    } catch (error) {
        console.error('Error:', error);
        res.write(JSON.stringify({
            error: error.message || 'Somthing went wrong in ai response',
        }));
        res.end();
    }
});

module.exports = router;