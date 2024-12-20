import { Skeleton, Stack } from "@mui/material"


type props = {
    count: number
}

export const PromptLoader = ({count}:props) => {
    return (
        <Stack spacing={1} sx={{
            margin: '14px 0px'
        }}>
            {Array(count).fill(0).map((_, index) => (
                <Skeleton 
                    variant="rounded" 
                    animation="wave"
                    key={index}
                    width={'100%'} 
                    height={24}
                />
            ))}
        </Stack>
    )
}