import { Stack } from "@mui/material";
import { PaymentVerification } from "./_components/PaymentVerification";



export default function Page(){
    return(
        <Stack sx={{
            minHeight: '100dvh',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <PaymentVerification />
        </Stack>
    )
}