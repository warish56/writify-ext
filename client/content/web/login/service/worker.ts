import { WorkerResponse } from "@/types/worker"
import { BG_BROADCAST, BG_LOGOUT_USER } from "../constants/worker"
import { sendMessageToWorker } from "../utils"


export const logoutUser = async () => {
    await sendMessageToWorker<WorkerResponse<null>>(BG_LOGOUT_USER)
}

export const broadcastMessage = async (message:string) => {
    await sendMessageToWorker<WorkerResponse<null>>(BG_BROADCAST, {action: message})
}