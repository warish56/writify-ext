import { Box, Typography, Stack, IconButton, Tooltip } from "@mui/material"
import { PromptLoader } from "./Loader";

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import RefreshIcon from '@mui/icons-material/Refresh';

type props = {
    loading: boolean;
    onApply: (text:string) => void;
    onRefresh: () => void;
    text:string;
    error?: Error | null;
}
export const PromptResult = ({loading, onApply, onRefresh, text, error}:props) => {
    return (
        <Stack sx={{
            gap: '10px',
            padding: '10px'
        }}>
            <Stack 
                direction="row" 
                justifyContent="space-between" 
                alignItems="center" 
                sx={{ mb: 0.5 }}
            >
                <Typography variant="h3">Suggestion</Typography>

                <Stack direction="row" sx={{
                    gap: '10px'
                }}>
                    <Tooltip title="Try Again">
                    <IconButton size="small" onClick={onRefresh}>
                        <RefreshIcon />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="Apply text">
                    <IconButton size="small" onClick={() => onApply(text)}>
                        <KeyboardReturnIcon />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="Copy">
                    <IconButton size="small" >
                        <ContentCopyIcon />
                    </IconButton>
                    </Tooltip>
                </Stack>
            </Stack>

            {loading && <PromptLoader  count={3}/>}

            {error && (
                <Typography color="error" variant="body2">
                    Error fetching AI suggestion
                </Typography>
            )}
            
            {!loading && !error &&
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
            }
        </Stack>
    )
}