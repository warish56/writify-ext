import { useRef, useState } from 'react';
import { InputBase, Paper, Box } from '@mui/material';
import { promptPrefix } from '@/constants/prompts';
import { sendTrackingEvent } from '@/utils';
import { Events } from '@/constants/events';
import { Prompt } from '@/types/AiResponse';
import { generatePrompt } from '@/utils/prompt';

type PromptInputProps = {
    onSubmit: (prompt: Prompt) => void;
    defaultValue?: string;
    children?: React.ReactNode;
}

export const PromptInput = ({ onSubmit, children, defaultValue = '' }: PromptInputProps) => {
    const [value, setValue] = useState(defaultValue);
    const tempRef = useRef({enterPressed: false});
    const inputRef = useRef<HTMLInputElement|null>(null);
    const contentRef = useRef<HTMLDivElement|null>(null);


    const handleSubmit = () => {
        if (!value.trim()) return;
        onSubmit(generatePrompt('system',`${value}. ${promptPrefix}`));
        inputRef.current?.blur();
        setTimeout(() => {
            contentRef.current?.scrollIntoView({
                behavior:'smooth',
                block: 'center'
            })
        }, 100)
        sendTrackingEvent(Events.CUSTOM_PROMPT_GENERATED,{prompt:value});
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            tempRef.current.enterPressed = true;
            handleSubmit();
        }
    };

    return (
        <Paper
            elevation={0}
            sx={(theme) => ({
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                gap: 1,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
            })}
        >
            <InputBase
                inputRef={inputRef}
                multiline
                maxRows={4}
                value={value}
                autoFocus
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your prompt..."
                sx={{
                    flex: 1,
                    px: 1,
                    py: 0.5,
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    '& .MuiInputBase-input.MuiInputBase-input': {
                        backgroundColor: 'transparent !important',
                        border: 'none !important',
                        color: 'text.primary',
                        boxShadow: 'none',
                        '&::placeholder': {
                            color: 'text.secondary',
                            opacity: 0.8,
                        },
                        '&:disabled': {
                            color: 'text.secondary',
                            WebkitTextFillColor: 'text.secondary',
                        },
                    },
                }}
            />

            { tempRef.current.enterPressed &&
                <Box ref={contentRef}>
                    {children}
                </Box>
            }
        </Paper>
    );
};
