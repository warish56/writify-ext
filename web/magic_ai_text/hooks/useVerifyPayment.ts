import { fetchData } from "@/services/api";
import { ServerError } from "@/types/api";
import { error } from "console";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

type serverResponse = {
    redirectLink:string
}

type state = [null, ServerError|null] | [serverResponse, ServerError| null]

type props = {
    razorpay_payment_id: string; 
    razorpay_signature: string; 
    orderId: string;
    planId: string;
    userId: string;
}

export const useVerifyPayment = ({
    razorpay_payment_id,
    razorpay_signature,
    orderId,
    planId,
    userId
}:props) => {
    const [isLoading, setLoading] = useState(false);
    const [response, setResponse] = useState<state>([null, null]);

    const verifyPayment = async () => {
        try{
            setLoading(true);
            const response =  await fetchData<serverResponse>('/orders/verify-payment',{
                method:'POST',
                body: JSON.stringify({
                    razorpay_payment_id,
                    razorpay_signature,
                    orderId,
                    planId,
                    userId
                })
            })
            setResponse(response);
            setLoading(false);
        }catch(err){
            setLoading(false);
        }
    }


    useEffect(() => {
        if(
            !razorpay_payment_id || 
            !razorpay_signature || 
            !orderId || 
            !planId || 
            !userId
        ){
            return;
        }
        verifyPayment();
    }, [])

    return {
        isLoading,
        data: response[0] ?? null,
        error: response[1] ?? null
    }
}