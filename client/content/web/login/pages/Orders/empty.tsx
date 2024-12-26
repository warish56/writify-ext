import { Typography, Paper } from '@mui/material';

export const EmptyOrders = () => (
  <Paper
    elevation={0}
    sx={{
      textAlign: 'center',
      p: 4,
      backgroundColor: 'background.paper',
      borderRadius: 2,
      minWidth:'400px',
    }}
  >
    <svg
      width="200"
      height="150"
      viewBox="0 0 200 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginBottom: '24px' }}
    >
      <rect x="40" y="30" width="120" height="90" rx="8" fill="#EAE4F5" />
      <rect x="60" y="50" width="80" height="8" rx="4" fill="#B4A1DB" />
      <rect x="60" y="70" width="40" height="8" rx="4" fill="#B4A1DB" />
      <circle cx="100" cy="110" r="25" fill="#7E60BF" fillOpacity="0.2" />
      <path
        d="M90 110L98 118L110 102"
        stroke="#7E60BF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

    <Typography variant="h2" sx={{ mb: 1, color: 'primary.main' }}>
      No Orders Found
    </Typography>
    <Typography variant="body1" color="gray.500">
      We couldn't find any orders matching your criteria.
    </Typography>
  </Paper>
);