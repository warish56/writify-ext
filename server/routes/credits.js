const express = require('express');
const { getAiResponse } = require('../controller/ai');

const router = express.Router();
const MAX_CREDITS_PER_DAY = 25;

router.get('/', async (req, res) => {
        res.json({
            data: {
                totalCredits: MAX_CREDITS_PER_DAY
            }
        });
   
});

module.exports = router;