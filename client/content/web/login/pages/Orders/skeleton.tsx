import { Box, Card, Skeleton, Stack } from "@mui/material";


export const OrderSkeleton = () => (
    <Card sx={{ p: 2, mb: 2, minWidth: '400px', }}>
      <Stack spacing={1}>
        <Skeleton variant="text" width="40%" height={32} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton variant="text" width="30%" />
          <Skeleton variant="text" width="40%" />
        </Box>
      </Stack>
  </Card>
  );