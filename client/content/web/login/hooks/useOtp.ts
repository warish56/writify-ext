import { useState } from "react";
import { fetchData } from "../service/api";
import { ServerError } from "@/types/api";

type successResponse = {
    message: string;
    jwtToken:string;
}

type state = [successResponse|null, ServerError | Error | undefined |null];


export const useOtp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<state>([null, null]);

    const verifyOtp = async (email: string, otp: string):Promise<state> => {
        try {           
            setIsLoading(true);
            const response = await fetchData<successResponse>('/auth/verify-otp', {
                method: 'POST',
                body: JSON.stringify({ email, otp })
            });
            setResponse(response); 
            setIsLoading(false);
            return response;
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            return [null, error as Error]
        }

    }

    return {
        isLoading,
        data: response[0] ?? null,
        error: response[1] ?? null,
        verifyOtp
    }

}   