
import { API_URL, Messages, Routes } from './constants.js';

const fetchAiResponse = async (text, prompt, sendResponse) => {
    fetch(`${API_URL}${Routes.AI}`, {
        method: 'POST',
        body: JSON.stringify({text, prompt}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if(res.ok) {
            return res.json();
        } else {
            throw new Error('Failed to fetch AI response');
        }
    })
    .then(response => sendResponse([response.data, null]))
    .catch(error => sendResponse([null, error]));
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.type === Messages.BG_GET_AI_RESPONSE) {
        fetchAiResponse(message.text, message.prompt, sendResponse);
        return true;
    }
});