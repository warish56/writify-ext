import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';
import { removeParams, sendTrackingEvent } from '../utils';
import { WEB_EVENTS } from '../constants/Events';

export const PaymentFailedPage = () => {
  const [redirectTimer, setRedirectTimer] = useState(5);
  const navigate = useNavigate()

  useEffect(() => {
    removeParams();
    const interval = setInterval(() => {
      setRedirectTimer((prev) => {
        const newValue = Math.max(prev - 1, 0);
        if(newValue === 0){
            clearInterval(interval);
            navigate('/plans', {
                replace: true
            })
        }
        return newValue
    });
    }, 1000);

    sendTrackingEvent(WEB_EVENTS.PLAN_PURCHASED_FAILED);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '98vh',
      backgroundColor: 'background.paper',
      px: 4,
      py: 6,
      borderRadius: 2,
      textAlign: 'center',
    }}
  >
    <ErrorOutlineIcon
      sx={{
        fontSize: '80px',
        color: 'error.main',
        mb: 3,
      }}
    />
    <Typography variant="h3" color="error.main" sx={{ mb: 2 }}>
      Payment Failed
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '400px' }}>
      We encountered an issue processing your payment. Please check your payment details or try again later.
    </Typography> 
   {/* Countdown Timer */}
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 4,
      }}
    >
      <CircularProgress
        size={24}
        sx={{ color: 'error.main', mr: 1 }}
      />
      <Typography variant="caption" color="text.secondary">
        Redirecting in {redirectTimer} seconds...
      </Typography>
    </Box>
  </Box>
  )
};
