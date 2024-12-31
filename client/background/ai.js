import { Routes } from "./constants.js";
import { getUserDetails } from "./user.js";
import { fetchData } from "./utils.js";

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
