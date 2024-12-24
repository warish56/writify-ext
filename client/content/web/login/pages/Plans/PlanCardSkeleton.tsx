import { Skeleton, Stack } from "@mui/material";


export const PlanCardsSkeleton = () => {
    return (
        <Stack
            sx={{
                gap: '20px',
                alignItems: 'center',
                mt: 4,
            }}
        >
            <Skeleton variant="circular" width={50} height={50} />
            <Skeleton variant="text" sx={{ fontSize: '1.25rem', mb: 1 }} />
            <Skeleton variant="text" sx={{ fontSize: '0.875rem' }} />
        </Stack>
    );
};

