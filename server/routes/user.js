const express = require('express');
const { getLoggedInUserDetails, getNonLoggedInUserDetails } = require('../controller/user');
const { getRequestIpAddress } = require('../utils/ip');
const { silenceAuthMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();


router.get('/details', silenceAuthMiddleware, async (req, res) => {
    try {
        const { email } = req.query; 
        const ipAddress = getRequestIpAddress(req);
        let data = {};
        if(email && req.user){
            data = await getLoggedInUserDetails(email,ipAddress);
        }else{
            data = await getNonLoggedInUserDetails(ipAddress);
        }
        res.json({ data });
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