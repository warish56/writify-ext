import React from "react"
import { Route, Routes } from "react-router-dom"
import { Snackbar, Stack } from "@mui/material"

import { useSnackbar } from "../hooks/useSnackbar"


import { LoginPage } from '../pages/LoginPage'
import { OtpPage } from "../pages/OtpPage"


export const MainRoute = () => {
  const {open:snackbarOpen, message:snackbarMessage} = useSnackbar();

    return (
        <Stack>
            <Routes>
                <Route path="login" element={<LoginPage />} />
                <Route path="otp" element={<OtpPage />} />
            </Routes>
            <Snackbar
                open={snackbarOpen}
                message={snackbarMessage}
            />
        </Stack>
    )
}