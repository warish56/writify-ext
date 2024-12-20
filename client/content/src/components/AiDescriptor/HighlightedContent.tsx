import React from 'react'
import { Box, Stack, Typography, Button } from "@mui/material"


type props = {
    loading: boolean;
    onApply: () => void;
    text:string;
}

export const HighlightedContent = React.forwardRef((props:props, ref) => {
    const {loading, onApply, text} = props;
    return (
        <Box ref={ref}>
            <Stack 
                direction="row" 
                justifyContent="space-between" 
                alignItems="center" 
                sx={{ mb: 0.5 }}
            >
                <Typography variant="h3">Suggestion</Typography>
                <Button
                    disabled={loading}
                    onClick={onApply}
                    variant="text"
                    size="small"
                    sx={{ color: 'text.secondary' }}
                >
                    Apply
                </Button>
            </Stack>
            
            <Box 
                sx={{
                    p: 1.25,
                    bgcolor: 'action.hover',
                    borderRadius: 1,
                    opacity: loading ? 0.5 : 1
                }}
            >
                <Typography variant="body1">{text}</Typography>
            </Box>
        </Box>
    )
})