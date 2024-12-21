import { useRef, useState } from 'react';
import { InputBase, Paper, Box } from '@mui/material';
import { codeStructure } from '@/constants/prompts';
import { jsonFormatPromt } from '@/constants/prompts';

type PromptInputProps = {
    onSubmit: (prompt: string) => void;
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
        onSubmit(`${value}. ${jsonFormatPromt} ${codeStructure}`);
        inputRef.current?.blur();
        setTimeout(() => {
            contentRef.current?.scrollIntoView({
                behavior:'smooth',
                block: 'center'
            })
        }, 100)

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
