
import  FormalIcon  from '@/assets/brief.svg?react' 
import  ConciseIcon  from '@/assets/compress.svg?react' 
import  EllaborateIcon  from '@/assets/expand.svg?react' 
import  SumaryIcon  from '@/assets/summary.svg?react' 
import { ConcisePropmpt, EllaboratedPropmpt, FormalPropmpt, SummaryPropmpt } from '@/constants/prompts';


import styles from './style.module.css';
import { PromptAction, Prompts } from '@/types/prompt';


const actions:PromptAction[] = [
    {   id: 'summarize', 
        label: 'Summarize', 
        icon: <SumaryIcon />,
        prompt: SummaryPropmpt.getPrompt()
    },
    {   id: 'formal', 
        label: 'Formal', 
        icon: <FormalIcon /> ,
        prompt: FormalPropmpt.getPrompt()
    },
    { 
        id: 'concise', 
        label: 'Concise', 
        icon: <ConciseIcon /> ,
        prompt: ConcisePropmpt.getPrompt()
    },
    { 
        id: 'ellaborate', 
        label: 'Ellaborate', 
        icon: <EllaborateIcon /> ,
        prompt: EllaboratedPropmpt.getPrompt()
    },
];


type PromptActionsProps ={
    onChange: (prompt:string, type:Prompts) => void;
    active: Prompts | null
}


export const PromptActions = ({onChange, active}:PromptActionsProps) => {
    return (
        <div className={styles.actions}>
        {actions.map(option => (
            <button
                key={option.id}
                onClick={() => onChange(option.prompt, option.id)}
                className={`${styles.action_button} ${active === option.id ? styles.btn_active : ''}`}
                >
                <span>{option.icon}</span>
            </button>
        ))}
    </div>
    )
    
}