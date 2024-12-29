import { useState } from "react";
import { fetchData } from "../service/api";
import { ServerError } from "../types/api";

type successResponse = {
    orderId: string;
    razorpayId: string;
    payment_link: string;
}
type state = [successResponse|null, ServerError | Error | undefined |null];

export const usePurchasePlan = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPlan, setPlan] = useState(-1)
    const [response, setResponse] = useState<state>([null, null]);

    const makePurchase = async (userId: string, planId: number):Promise<state> => {
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
            setResponse(response); 
            setIsLoading(false);
            return response;
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            return [null, error as Error];
        }
    }

    return {
        isLoading,
        data: response[0] ?? null,
        error: response[1] ?? null,
        makePurchase,
        selectedPlan
    }

}   