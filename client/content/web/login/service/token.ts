import { WorkerResponse } from "@/types/worker"
import { BG_GET_TOKEN, BG_SET_TOKEN } from "../constants/worker"
import { sendMessageToWorker } from "../utils"


export const setTokenInStorage = async (token:string) => {
    await sendMessageToWorker(BG_SET_TOKEN, {token})
}

export const getTokenFromStorage = async() => {
 const response = await sendMessageToWorker<WorkerResponse<{token:string}>>(BG_GET_TOKEN);
 if(!response.success || response.error){
    return null;
 }
 return response.data.token
}