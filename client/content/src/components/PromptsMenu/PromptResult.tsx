import { Typography, Stack, IconButton, Tooltip } from "@mui/material"
import { PromptLoader } from "./Loader";

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useClipboard } from "@/hooks/useClipboard";

type props = {
    loading: boolean;
    onApply: (text:string) => void;
    onRefresh: () => void;
    text:string;
    error?: Error | null;
}
export const PromptResult = ({loading, onApply, onRefresh, text, error}:props) => {
    const {copyToBoard} = useClipboard();
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
                    <IconButton size="small" onClick={() => {
                        copyToBoard(text)
                    }}>
                        <ContentCopyIcon />
                    </IconButton>
                    </Tooltip>
                </Stack>
            </Stack>

            {loading && <PromptLoader  count={3}/>}

            {!loading && error && (
                <Typography color="error" variant="body2">
                    {error?.message || (error as unknown as string) || 'Error fetching AI suggestion'}
                </Typography>
            )}
            
            {!loading && !error &&
                <Stack 
                    sx={{
                        p: 1.25,
                        bgcolor: 'action.hover',
                        borderRadius: 1,
                        gap: '10px',
                        opacity: loading ? 0.5 : 1
                    }}
                >

                            <Typography 
                                variant="body1" 
                                sx={{
                                    whiteSpace: 'pre-line',
                                    lineHeight: '1.9'
                                }}
                                >
                                    {text}
                            </Typography>


                    {/* {
                        processedResults.map(({text, isCode}) => {
                            if(isCode){
                                return (
                                    <code>{text}</code>
                                )
                            }
                            return (
                                <Typography 
                                variant="body1" 
                                sx={{
                                    whiteSpace: 'pre-line',
                                    lineHeight: '1.9'
                                }}
                                >
                                    {text}
                                </Typography>
                            )
                        })
                    } */}

                    
                </Stack>
            }
        </Stack>
    )
}