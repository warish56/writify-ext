import { IconButton, Stack } from "@mui/material"
import CloseIcon from '@/assets/close.svg?react';


type props = {
    children: React.ReactNode,
    onClose: () => void
}
export const ActionHeader =({children, onClose}:props) => {
    return (
        <Stack 
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    p: 1.5,
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                    bgcolor: 'background.default'
                }}
            >
                {children}
                <IconButton 
                    onClick={onClose}
                    size="small"
                >
                    <CloseIcon />
                </IconButton>
            </Stack>

    )
} 