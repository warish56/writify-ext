const express = require('express');
const { getAiResponse, checkAndUpdateNonLoggedInUserUsage, checkAndUpdateLoggedInUserUsage } = require('../controller/ai');
const { getRequestIpAddress } = require('../utils/ip');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const ipAddress = getRequestIpAddress(req);
        const {prompts, email} = req.body;
        console.log("==ai details==",{email, ipAddress})
        if(!email){
            await checkAndUpdateNonLoggedInUserUsage(ipAddress)
        }else{
            await checkAndUpdateLoggedInUserUsage(email);   
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