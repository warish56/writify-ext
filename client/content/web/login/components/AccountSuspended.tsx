import { Alert, Box, Typography, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export const AccountSuspendedBanner = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: '600px',
        margin: '0 auto',
        overflow: 'hidden',
        position: 'relative',
        border: '2px solid',
        borderColor: 'error.main',
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          bgcolor: 'error.main',
          py: 1.5,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <WarningAmberIcon sx={{ color: 'white' }} />
        <Typography variant="h3" sx={{ color: 'white', fontWeight: 600 }}>
          Account Suspended
        </Typography>
      </Box>

      <Alert 
        severity="error"
        icon={<ErrorOutlineIcon sx={{ fontSize: 28 }} />}
        sx={{
          '& .MuiAlert-icon': {
            color: 'error.main',
            alignItems: 'flex-start',
            marginTop: 1,
          },
          backgroundColor: 'error.lighter',
          p: 3,
          '& .MuiAlert-message': {
            width: '100%',
          },
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Typography 
            variant="body1"
            sx={{
              color: 'error.dark',
              mb: 3,
              fontWeight: 500,
            }}
          >
            Your account has been temporarily suspended due to unusual activity. This requires immediate attention to restore access to your account.
          </Typography>
        </Box>
      </Alert>
    </Paper>
  );
};

