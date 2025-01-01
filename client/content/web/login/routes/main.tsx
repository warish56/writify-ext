import { Route, Routes, useNavigate} from "react-router-dom"
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
import { ErrorBoundary } from "../components/ErrorBoundary"
import { useEffect } from "react"
import { listenToExternalMessages } from "../service/ExternalMessagelistener"
import { BroadcastMessages } from "../constants/worker"


export const MainRoute = () => {
  const {open:snackbarOpen, message:snackbarMessage} = useSnackbar();
  const {isLoading, getUserDetailsFromStore} = useUserDetails();
  const navigate = useNavigate();


  // listening for external messages
  useEffect(() => {
    const onMessage = async (message:string) =>{
        switch(message){
            case BroadcastMessages.USER_LOGGED_OUT:{
                await getUserDetailsFromStore();
                setTimeout(() => {
                    navigate('/auth/login');
                }, 1000)
                return;
            }
            default: return;
        }
    }
    const removeListener = listenToExternalMessages(onMessage);

    return () => {
        removeListener();
    }
  }, [])

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
            <ErrorBoundary id="top_route">
                <Routes>
                        <Route path="auth" element={<AuthRoute />} >
                            <Route path="login" element={<LoginPage />} />
                            <Route path="otp" element={<OtpPage />} />
                        </Route>

                        <Route path="/" element={<RootRoute />} >
                            <Route path="plans" element={
                                <ErrorBoundary key='plan_page' id="plan_page">
                                    <PlansPage />
                                </ErrorBoundary>
                            } />
                            <Route path="orders" element={
                                <ErrorBoundary key='order_page' id="order_page">
                                    <OrdersList />
                                </ErrorBoundary>
                            } />
                            <Route path="payment_success" element={<PaymentSuccessPage />} />
                            <Route path="payment_failed" element={<PaymentFailedPage />} />
                        </Route>
                        
                </Routes>
            </ErrorBoundary>
            <Snackbar
                open={snackbarOpen}
                message={snackbarMessage}
            />
        </Stack>
    )
}