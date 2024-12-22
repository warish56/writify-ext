import { Stack, Tooltip, Typography } from "@mui/material"

import StarIcon from '@mui/icons-material/Star';
import { useCredits } from "@/hooks/useCredits";

export const CreditsChip = () => {
    const {availableCredits} = useCredits()
    return (
        <Tooltip title={`Only ${availableCredits} credits left for today`} placement="top">
        <Stack component="button" direction="row" sx={{
            gap: '5px',
            alignItems: 'center',
            border: `1px #f3b70c solid`,
            borderRadius: '20px',
            backgroundColor: 'transparent'
        }}>
            <StarIcon sx={{
                color: "#f3b70c"
            }}/>
            <Typography variant="caption">{availableCredits}</Typography>
        </Stack>
        </Tooltip>
    )
}