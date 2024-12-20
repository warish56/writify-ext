import { Stack, Typography, IconButton, SxProps, Tooltip } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
            minWidth: '200px',
            maxWidth: '400px',
            maxHeight: '300px',
            padding: '10px',
            paddingBottom: '20px',
            backgroundColor: 'background.paper',
            ...sx
        }}>
            <Stack direction="row" sx={(theme) => ({
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 4px',
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
                    <Typography sx={{
                        marginLeft:'8px',
                        textTransform: 'capitalize'
                    }} variant={showBackButton ? "caption" : 'h3'}>{title}</Typography>
                </Stack>
                

                <Tooltip title="Close menu">
                    <IconButton sx={{
                        marginLeft: 'auto'
                    }} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
            {children}
        </Stack>
    )
}