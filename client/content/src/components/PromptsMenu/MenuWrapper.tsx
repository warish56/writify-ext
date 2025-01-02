import { Stack, Typography, IconButton, SxProps, Tooltip } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CreditsChip } from "../CreditsChip";

type props = {
    sx?:SxProps;
    children: React.ReactNode;
    title: string;
    showBackButton?: boolean;
    onBack?: () => void;
    onClose: () => void;
}
export const MenuWrapper = ({children, title, onBack, onClose, showBackButton=true, sx={}}:props) => {
    return (
        <Stack sx={{
            gap: '10px',
            minWidth: '250px',
            maxWidth: '400px',
            maxHeight: '300px',
            padding: '0 0 10px 0',
            paddingBottom: '20px',
            overflowY: 'auto',
            backgroundColor: 'background.paper',
            ...sx
        }}>
            <Stack direction="row" sx={(theme) => ({
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 4px',
                backgroundColor: theme.palette.background.paper,
                borderBottom: '1px white solid',
                borderBottomColor: theme.palette.gray[400],
                position: 'sticky',
                top:0,
                left: 0,
                zIndex:10000
            })}>
                <Stack direction="row" sx={{
                    alignItems: 'center',
                }}>
                    {showBackButton &&
                        <IconButton onClick={onBack}>
                            <ArrowBackIcon />
                        </IconButton>
                    }
                    <Typography sx={(theme) => ({
                        marginLeft:'8px',
                        textTransform: 'capitalize',
                        color: theme.palette.text.default
                    })} variant={'h3'}>{title}</Typography>
                </Stack>
                

                <Stack direction="row" sx={{
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <CreditsChip />
                    <Tooltip title="Close menu">
                        <IconButton sx={{
                            marginLeft: 'auto'
                        }} onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Stack>
            {children}
        </Stack>
    )
}