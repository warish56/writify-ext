import { useEffect, useState } from "react";
import { ServerError } from "../types/api";
import { BG_FETCH_USER_ORDERS } from "../constants/worker";
import { useUserDetails } from "./useUserDetails";
import { WorkerResponse } from "../types/worker";
import { Order } from "../types/plans";
import { sendMessageToWorker } from "../utils";


type response = {
    list: Order[]
}

type state = [response|null, ServerError|  Error | null | undefined];

export const useUserOrders = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<state>([null, null]);
    const {userData} = useUserDetails()

    const getUserOrders = async () => {
        let currResponse:state = [null, null]
        setIsLoading(true);
        const response = await sendMessageToWorker<WorkerResponse<[response, ServerError]>>(BG_FETCH_USER_ORDERS, {userId: userData?.id});
        const {success, data} = response;
        if(success){
            currResponse = [data[0], data[1]]
        }else{
            currResponse = [null, data[1]]
        }
        setIsLoading(false);
        setResponse(currResponse);
        return currResponse;
        
    }

    useEffect(() => {
        getUserOrders();
    }, [])

    return {
        isLoading,
        data: response[0] ?? null,
        error: response[1] ?? null,
        getUserOrders
    }

}   