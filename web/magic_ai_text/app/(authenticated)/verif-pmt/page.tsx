import { Box, CircularProgress, Stack } from "@mui/material";
import { PaymentVerification } from "./_components/PaymentVerification";
import { Suspense } from "react";



export default function Page(){
    return(
        <Stack sx={{
            minHeight: '100dvh',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Suspense fallback={
                <Box>
                    <CircularProgress size={80} color="primary" />
                </Box>
            }>
            <PaymentVerification />
            </Suspense>
        </Stack>
    )
}