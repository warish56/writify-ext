import { useState } from "react";
import { fetchData } from "../service/api";
import { ApiResponse } from "../types/api";

type successResponse = {
    message: string;
}

type state = [ApiResponse<successResponse>|null, Error | null];


export const useOtp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<state>([null, null]);

    const verifyOtp = async (email: string, otp: string) => {
        let currResponse:state = [null, null]
        try {           
            setIsLoading(true);
            const response = await fetchData<successResponse>('/auth/verify-otp', {
                method: 'POST',
                body: JSON.stringify({ email, otp })
            });
            currResponse =[response, null]; 
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            currResponse =[null, error as Error]; 
        }
        setResponse(currResponse);
        return currResponse;
    }

    return {
        isLoading,
        response,
        verifyOtp
    }

}   