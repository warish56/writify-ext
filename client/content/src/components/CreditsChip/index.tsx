import { Button, Chip, Tooltip, Typography } from "@mui/material"

import StarIcon from '@mui/icons-material/Star';
import { useCredits } from "@/hooks/useCredits";
import { sendMessageToWorker } from "@/utils";
import { BG_OPEN_LOGIN_PAGE } from "@/constants";

export const CreditsChip = () => {
    const {availableCredits, isCreditsAvailable} = useCredits();

    const openLoginPage = () => {
        sendMessageToWorker(BG_OPEN_LOGIN_PAGE)
    }

    if(!isCreditsAvailable){
        return (
            <Tooltip title="Credits Expired for the day, Please upgrade">
                <Chip size="small" variant="filled" color="primary" onClick={openLoginPage} label="Upgrade" />
            </Tooltip>
        )
    }

    return (
        <Tooltip title={`Only ${availableCredits} credits left for today`} placement="top">
        <Button 
        onClick={openLoginPage}
        sx={{
            gap: '5px',
            cursor: 'pointer',
            alignItems: 'center',
            border: `1px #f3b70c solid`,
            borderRadius: '20px',
            display:'flex',
            padding: '3px 8px',
            backgroundColor: 'transparent',
            '&:hover':{
                outline: 'none',
                backgroundColor: "#f3b70c",
                '& svg':{
                    color: 'white'
                },
                '& span': {
                    color: 'white'
                }
            }
        }}>
            <StarIcon sx={{
                color: "#f3b70c"
            }}/>
            <Typography variant="caption" color="background.dark">{availableCredits}</Typography>
        </Button>
        </Tooltip>
    )
}