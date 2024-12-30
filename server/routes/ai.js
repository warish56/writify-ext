const express = require('express');
const { getAiResponse } = require('../controller/ai');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const {prompts} = req.body;
        const aiResponse = await getAiResponse(prompts);
        res.json({
            data: {
                result: aiResponse
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;