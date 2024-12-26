import { ComponentProps } from "react"
import { Box, LinearProgress, Typography } from "@mui/material"
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { AppModal } from "./AppModal"

type props = Omit<ComponentProps<typeof AppModal>, 'children'>
export const PaymentWaitingModal = (props:props) => {
    return (
        <AppModal {...props}>
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'background.paper',
                px: 4,
                py: 6,
            }}
            >
            <HourglassTopIcon
                sx={{
                    fontSize: '64px',
                    color: 'primary.main',
                    mb: 3,
                }}
            />
            <Typography variant="h4" color="text.primary" sx={{ mb: 2, textAlign: 'center' }}>
                Payment Pending
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', maxWidth: '400px', mb: 4 }}>
                Please wait while we are redirecting you to the payments page.
            </Typography>
            <Box sx={{
                width: '100%'
            }}>
                <LinearProgress color="primary" />
            </Box>
            </Box>
    </AppModal>
  
)}
