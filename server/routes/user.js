const express = require('express');
const { getLoggedInUserDetails, getNonLoggedInUserDetails } = require('../controller/user');
const { getRequestIpAddress } = require('../utils/ip');

const router = express.Router();


router.get('/details', async (req, res) => {
    try {
        const { email } = req.query; 
        const ipAddress = getRequestIpAddress(req);
        console.log("==user details==",{email, ipAddress})
        let data = {};
        if(email){
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