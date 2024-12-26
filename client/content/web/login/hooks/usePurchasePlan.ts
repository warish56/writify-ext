import { useState } from "react";
import { fetchData } from "../service/api";
import { ApiResponse, ServerError } from "../types/api";

type successResponse = {
    orderId: string;
    razorpayId: string;
    payment_link: string;
}
type state = [ApiResponse<successResponse>|null, ServerError | Error | undefined |null];

export const usePurchasePlan = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPlan, setPlan] = useState(-1)
    const [response, setResponse] = useState<state>([null, null]);

    const makePurchase = async (userId: string, planId: number) => {
        let currResponse:state = [null, null]
        try {
            setPlan(planId);           
            setIsLoading(true);
            const response = await fetchData<successResponse>('/orders/create-order', {
                method: 'POST',
                body: JSON.stringify({ 
                    userId, 
                    planId
                 })
            });
            currResponse = [response, response?.error];
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            currResponse = [null, error as Error];
        }
        setResponse(currResponse);
        return currResponse;
    }

    return {
        isLoading,
        data: response[0] ?? null,
        error: response[1] ?? null,
        makePurchase,
        selectedPlan
    }

}   