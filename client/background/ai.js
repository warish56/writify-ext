import { Routes } from "./constants.js";
import { fetchData } from "./utils.js";

export const fetchAiResponse = async (prompts) => {
    const result = await fetchData(Routes.AI, {
        method: 'POST',
        body: JSON.stringify({prompts}),
    })
    return result;
}
