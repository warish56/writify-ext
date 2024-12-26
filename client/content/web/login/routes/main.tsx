import { Route, Routes} from "react-router-dom"
import { CircularProgress, Snackbar, Stack } from "@mui/material"

import { useSnackbar } from "../hooks/useSnackbar"
import { useUserDetails } from "../hooks/useUserDetails"


import { LoginPage } from '../pages/LoginPage'
import { OtpPage } from "../pages/OtpPage"
import {PaymentSuccessPage} from "../pages/PaymentSuccessPage";
import {PlansPage} from "../pages/Plans/PlansPage"

import { AuthRoute } from "./Auth"
import { RootRoute } from "./Root"
import { PaymentFailedPage } from "../pages/PaymentFailedPage"
import OrdersList from "../pages/Orders/list"



export const MainRoute = () => {
  const {open:snackbarOpen, message:snackbarMessage} = useSnackbar();
  const {isLoading} = useUserDetails();

  if(isLoading){
    return (
        <Stack sx={{
            minHeight: '100vh',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <CircularProgress size={50} />
        </Stack>
    )
  }

    return (
        <Stack>
            <Routes>
                    <Route path="auth" element={<AuthRoute />} >
                        <Route path="login" element={<LoginPage />} />
                        <Route path="otp" element={<OtpPage />} />
                    </Route>

                    <Route path="/" element={<RootRoute />} >
                        <Route path="plans" element={<PlansPage />} />
                        <Route path="orders" element={<OrdersList />} />
                        <Route path="payment_success" element={<PaymentSuccessPage />} />
                        <Route path="payment_failed" element={<PaymentFailedPage />} />
                    </Route>
                    
            </Routes>
            <Snackbar
                open={snackbarOpen}
                message={snackbarMessage}
            />
        </Stack>
    )
}