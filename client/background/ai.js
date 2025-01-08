import { AI_STREAM_RESPONSE_KEY, Routes } from "./constants.js";
import { getUserDetails } from "./user.js";
import { fetchData, streamData } from "./utils.js";

export const fetchAiResponse = async (prompts) => {
    const userDetails = await getUserDetails();
    const result = await fetchData(Routes.AI, {
        method: 'POST',
        body: JSON.stringify({
            prompts,
            email: userDetails?.email ?? ''
        }),
    })
    return result;
}

export const streamAiResponse = async (prompts, port) => {
    const userDetails = await getUserDetails();
    await streamData(Routes.AI, 
        port,
        AI_STREAM_RESPONSE_KEY,
        {
        method: 'POST',
        body: JSON.stringify({
            prompts,
            email: userDetails?.email ?? ''
        }),
    })
}

