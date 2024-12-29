import { Routes } from "./constants.js";
import { fetchData } from "./utils.js";

export const fetchAiResponse = async (text, prompt) => {
    const result = await fetchData(Routes.AI, {
        method: 'POST',
        body: JSON.stringify({text, prompt}),
    })
    return result;
}
