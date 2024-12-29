import { BG_UPDATE_AVAILABLE_CREDITS } from "../constants/worker"
import { ServerError } from "../types/api"
import { WorkerResponse } from "../types/worker"
import { sendMessageToWorker } from "../utils"



export const useCredits = () => {

    const resetCreditsUsed = () => {
        sendMessageToWorker<WorkerResponse<[unknown, ServerError]>>(BG_UPDATE_AVAILABLE_CREDITS, {credits:0})
    }

    return {
        resetCreditsUsed
    }
}