import { Box, Skeleton, Stack } from '@mui/material';

type LoaderProps = {
    count?: number;
}



export const Loader = ({ count = 3 }: LoaderProps) => {
    return (
        <Stack spacing={1} sx={{
            margin: '14px 0px'
        }}>
            {Array(count).fill(0).map((_, index) => (
                <Skeleton 
                    variant="rounded" 
                    key={index}
                    width={'100%'} 
                    height={24}
                />
            ))}
        </Stack>
    );
};