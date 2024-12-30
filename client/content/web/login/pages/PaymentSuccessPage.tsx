import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';
import { useUserDetails } from '../hooks/useUserDetails';
import { useCredits } from '../hooks/useCredits';
import { removeParams, sendTrackingEvent } from '../utils';
import { WEB_EVENTS } from '../constants/Events';

export const PaymentSuccessPage = () => {
  const [redirectTimer, setRedirectTimer] = useState(5);
  const {fetchUserDetailsFromServer} = useUserDetails();
  const {resetCreditsUsed} = useCredits();
  const navigate = useNavigate();


  useEffect(() => {
    fetchUserDetailsFromServer();
    resetCreditsUsed();
    sendTrackingEvent(WEB_EVENTS.PLAN_PURCHASED_SUCCESS);
  }, [])

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
      <CheckCircleOutlineIcon
        sx={{
          fontSize: '80px',
          color: 'success.main',
          mb: 3,
        }}
      />
      <Typography variant="h3" color="text.primary" sx={{ mb: 2 }}>
        Payment Successful!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '400px' }}>
        Thank you for your payment. Your transaction was completed successfully. You can now enjoy our premium features.
      </Typography>
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
        sx={{ color: 'success.main', mr: 1 }}
      />
      <Typography variant="caption" color="text.secondary">
        Redirecting in {redirectTimer} seconds...
      </Typography>
    </Box>
    </Box>
  );
};
