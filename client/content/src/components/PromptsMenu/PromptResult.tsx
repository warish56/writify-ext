import { Typography, Stack, IconButton, Tooltip } from "@mui/material"

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useClipboard } from "@/hooks/useClipboard";
import { useEffect, useRef } from "react";
import { StreamTextLoader } from "../StreamTextLoader";

type props = {
    onApply: (text:string) => void;
    onRefresh: () => void;
    error?: string;
    chunks: string[]
}

const END_TEXT = '[DONE]';

export const PromptResult = ({ onApply, onRefresh, error, chunks}:props) => {
    const {copyToBoard} = useClipboard();
    const containerRef = useRef<HTMLDivElement | null>(null);


    const getCombinedText = () => {
        return chunks.join('');
    }

    useEffect(() => {
        if(containerRef.current){
            containerRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            })
        }
    }, [chunks])

    const loading = chunks.length === 0;
    const hasEnded = chunks[chunks.length -1] === END_TEXT

    return (
        <Stack 
        ref={containerRef}
        sx={{
            gap: '10px',
            padding: '10px'
        }}>
            <Stack 
                direction="row" 
                justifyContent="space-between" 
                alignItems="center" 
                sx={{ mb: 0.5 }}
            >
                <Typography variant="h3" sx={(theme) => ({
                    '&&':{
                        color: theme.palette.text.default
                    }
                })}>Suggestion</Typography>

                <Stack direction="row" sx={{
                    gap: '10px'
                }}>
                    <Tooltip title="Try Again">
                    <IconButton size="small" onClick={onRefresh}>
                        <RefreshIcon />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="Apply text">
                    <IconButton size="small" onClick={() => onApply(getCombinedText())}>
                        <KeyboardReturnIcon />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="Copy">
                    <IconButton size="small" onClick={() => {
                        copyToBoard(getCombinedText())
                    }}>
                        <ContentCopyIcon />
                    </IconButton>
                    </Tooltip>
                </Stack>
            </Stack>


            {error && (
                <Typography color="error" variant="body2">
                    {error || 'Error fetching AI suggestion'}
                </Typography>
            )}
            
            {!error &&
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
                                    {
                                        chunks.map((chunk, idx) =>  {
                                            return <span key={`${chunk}_${idx}`}>{chunk === END_TEXT ? '' : chunk}</span>
                                        })
                                    }
                                    {!hasEnded && <StreamTextLoader />}
                            </Typography>  
                </Stack>
            }
        </Stack>
    )
}