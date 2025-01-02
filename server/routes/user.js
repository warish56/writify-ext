const express = require('express');
const { getLoggedInUserDetails, getNonLoggedInUserDetails } = require('../controller/user');
const { getRequestIpAddress } = require('../utils/ip');
const { silenceAuthMiddleware } = require('../middleware/authMiddleware');
const { getFreeUserIdFromCookie, clearFreeUserIdFromCookie } = require('../services/freeAccount');
const { generateRandomUserId } = require('../utils/otp');

const router = express.Router();


router.get('/details', silenceAuthMiddleware, async (req, res) => {
    try {
        const { email } = req.query; 
        const ipAddress = getRequestIpAddress(req);
        let randomUserId = getFreeUserIdFromCookie(req);

        let data = {};
        if(email && req.user){
            /**
             * if the user is logged in then we need to remove the free user id token
             */
            if(randomUserId){
                clearFreeUserIdFromCookie(res);
            }
            data = await getLoggedInUserDetails(email,ipAddress);
        }else{
            data = await getNonLoggedInUserDetails(res, ipAddress, randomUserId);
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