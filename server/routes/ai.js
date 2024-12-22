const express = require('express');
const { getAiResponse } = require('../controller/ai');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const {text, prompt} = req.body;
        const aiResponse = await getAiResponse(text, prompt);
        res.json({
            data: JSON.parse(aiResponse)
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;