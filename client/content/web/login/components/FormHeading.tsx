import React from "react"
import { Box, Stack, Typography } from "@mui/material"

export const FormHeading = () => {
    return (
         <Stack alignItems="center" spacing={2}>
         <Box
             component="img"
             src="../assets/logo.png"
             alt="WriteAI Logo"
             sx={{ width: 64, height: 64 }}
         />
         <Typography variant="h4" color="text.primary">
             WriteAI
         </Typography>
            <Typography variant="body2" color="text.secondary">
                Your AI Writing Assistant
            </Typography>
        </Stack>
    )
}