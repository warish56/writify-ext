'use client';

import { useVerifyPayment } from "@/hooks/useVerifyPayment";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export const PaymentVerification = () => {
    const searchParams = useSearchParams();
    const router = useRouter()

    const razorpayPaymentId = searchParams.get('razorpay_payment_id')
    const razorpaySignature = searchParams.get('razorpay_signature')
    const orderId = searchParams.get('orderId')
    const planId = searchParams.get('planId')
    const userId = searchParams.get('userId')

    const {isLoading, error, data} = useVerifyPayment({
        razorpay_payment_id: razorpayPaymentId || '',
        razorpay_signature: razorpaySignature || '',
        orderId: orderId || '',
        planId: planId || '',
        userId: userId || ''
    })

    useEffect(() => {
        if(!error && data){
            router.replace(data.redirectLink);
        }else if(error && error.redirectLink){
            router.replace(error.redirectLink);
        }
    }, [error, data])

    if(
        !razorpayPaymentId || 
        !razorpaySignature || 
        !orderId || 
        !planId || 
        !userId
    ){
        router.replace('/');
        return null;
    }

    return (
        <Stack sx={{
            gap: '10px',
            alignItems: 'center'
        }}>
            {isLoading && 
                <>
                    <CircularProgress size={80} color="primary"/>
                    <Typography>Verifying Payment</Typography>
                </>
            }
        </Stack>
    )
}