import React, { useEffect, useRef, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { AiResponse } from '@/types/AiResponse';
import { Loader } from './loader';
import { ActionHeader } from './ActionHeader';
import { HighlightedContent } from './HighlightedContent';
import { SuggestionList } from './SuggestionList';

type AiDescriptorProps = {
    text?: string;
    data?: AiResponse|null;
    header?: React.ReactNode;
    loading: boolean;
    error: boolean;
    onInsert: (text: string) => void;
    onClose: () => void;
}

export const AiDescriptor = React.forwardRef((props: AiDescriptorProps, ref: React.Ref<HTMLDivElement>) => {
    const { onInsert, onClose, header, loading, error, data } = props;
    const [currentResult, setCurrentResult] = useState(data?.result ?? '');
    const mainTextContRef = useRef<HTMLDivElement|null>(null);

    const handleResultChange = (text: string) => {
        setCurrentResult(text);
        mainTextContRef.current?.scrollIntoView({block: 'center', behavior: 'smooth'});
    };

    useEffect(() => {
        if(data?.result) {
            setCurrentResult(data.result);
        }
    }, [data]);

    return (
        <Paper 
            ref={ref} 
            elevation={0}
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                bgcolor: 'background.default'
            }}
        >
            <ActionHeader onClose={onClose}>
                {header}
            </ActionHeader>

            <Box sx={{ p: 1.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {currentResult && (
                    <HighlightedContent 
                        ref={mainTextContRef}
                        loading={loading}
                        onApply={() => onInsert(currentResult)}
                        text={currentResult}
                    /> 
                )}

                <Box sx={{ mt: 2 }}>
                    <Typography variant="h3" sx={{ mb: 1 }}>
                        {data ? 'More AI Suggestions' : 'Select Action'}
                    </Typography>

                    {loading && <Loader count={3} />}
                    {error && (
                        <Typography color="error" variant="body2">
                            Error fetching AI suggestions
                        </Typography>
                    )}

                    {!loading && !error && data?.suggestions && (
                        <SuggestionList 
                            suggestions={data.suggestions}
                            onClick={handleResultChange}
                        />
                    )}
                </Box>
            </Box>
        </Paper>
    );
});