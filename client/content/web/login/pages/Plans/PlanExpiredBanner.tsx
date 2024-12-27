import {
  Box,
  Paper,
  Typography,
  Stack,
} from '@mui/material';
import { Warning } from '@mui/icons-material';

interface PlanExpiredBannerProps {
  expiredPlan: string;
}

export const PlanExpiredBanner = ({ 
  expiredPlan
}:PlanExpiredBannerProps) => {

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        p: 3,
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'primary.light',
        borderRadius: 2,
      }}
    >
      {/* Decorative background element */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 150,
          height: 150,
          borderRadius: '50%',
          backgroundColor: 'primary.light',
          opacity: 0.1,
        }}
      />
      
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={3}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Warning
            sx={{
              fontSize: 40,
              color: 'primary.main',
            }}
          />
          <Box>
            <Typography 
              variant="h2" 
              sx={{ 
                color: 'primary.main',
                mb: 0.5,
              }}
            >
              Your {expiredPlan} Plan Has Expired
            </Typography>
            <Typography 
              variant="body1"
              sx={{ color: 'text.secondary' }}
            >
              To continue enjoying our services, please choose a new plan that best suits your needs.
            </Typography>
          </Box>
        </Stack>
      </Stack>

      {/* Optional: Add a close button if needed */}
      {/* <IconButton
        size="small"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: 'gray.400',
        }}
      >
        <Close fontSize="small" />
      </IconButton> */}
    </Paper>
  );
};
