import { useEffect, useState } from "react";
import { ServerError } from "../types/api";
import { useUserDetails } from "./useUserDetails";
import { Order } from "../types/plans";
import { fetchData } from "../service/api";


type response = {
    list: Order[]
}

type state = [response|null, ServerError|  Error | null | undefined];

export const useUserOrders = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<state>([null, null]);
    const {userData} = useUserDetails()

    const getUserOrders = async () => {
        try {
            setIsLoading(true);
            const userId = userData?.id
            const response = await fetchData<response>('/orders/list', {
                method: 'POST',
                body: JSON.stringify({ 
                    userId, 
                 })
            });
            setResponse(response); 
            setIsLoading(false);
            return response;
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            return [null, error as Error];
        }
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