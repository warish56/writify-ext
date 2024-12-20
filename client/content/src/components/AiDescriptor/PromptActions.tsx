import { IconButton, Stack } from '@mui/material';

import { ConcisePropmpt, EllaboratedPropmpt, FormalPropmpt, SummaryPropmpt } from '@/constants/prompts';
import { PromptAction, Prompts } from '@/types/prompt';

import SummarizeIcon from '@mui/icons-material/Summarize';
import WorkIcon from '@mui/icons-material/Work';
import ConciseIcon from '@mui/icons-material/Compress';
import EllaborateIcon from '@mui/icons-material/Expand';

const actions: PromptAction[] = [
    {   
        id: 'summarize', 
        label: 'Summarize', 
        icon: <SummarizeIcon />,
        prompt: SummaryPropmpt.getPrompt()
    },
    {   
        id: 'formal', 
        label: 'Formal', 
        icon: <WorkIcon />,
        prompt: FormalPropmpt.getPrompt()
    },
    { 
        id: 'concise', 
        label: 'Concise', 
        icon: <ConciseIcon />,
        prompt: ConcisePropmpt.getPrompt()
    },
    { 
        id: 'ellaborate', 
        label: 'Ellaborate', 
        icon: <EllaborateIcon />,
        prompt: EllaboratedPropmpt.getPrompt()
    },
];

type PromptActionsProps = {
    onChange: (prompt: string, type: Prompts) => void;
    active: Prompts | null
}

export const PromptActions = ({ onChange, active }: PromptActionsProps) => {
    return (
        <Stack 
            direction="row" 
            spacing={1}
            sx={{
                padding: 1,
                display: 'flex',
                alignItems: 'center'
            }}
        >
            {actions.map(option => (
                <IconButton
                    key={option.id}
                    color={'primary'}
                    onClick={() => onChange(option.prompt, option.id)}
                    size="small"
                    sx={() =>({
                        backgroundColor: active === option.id ? "secondary.light": "transparent" ,
                    })}
                >                   
                        {option.icon}
                </IconButton>
            ))}
        </Stack>
    );
};