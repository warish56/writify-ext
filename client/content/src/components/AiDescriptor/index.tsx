import styles from './style.module.css';

import  SummarizeIcon  from '@/assets/brief.svg?react' 
import  CompressIcon  from '@/assets/compress.svg?react' 
import  ExpandIcon  from '@/assets/expand.svg?react' 
import { AiResponse } from '@/types/AiResponse';
import { Loader } from '@/components/Loader';



type AiDescriptorProps = {
    text?: string;
    onInsert: (text: string) => void;
    onClose: () => void;
    loading: boolean;
    error: boolean;
    data?: AiResponse|null;
}

const transformOptions = [
    { id: 'summarize', label: 'Summarize', icon: <SummarizeIcon /> },
    { id: 'compress', label: 'Compress', icon: <CompressIcon /> },
    { id: 'expand', label: 'Expand', icon: <ExpandIcon /> },
];

export const AiDescriptor = ({ onInsert, onClose, loading, error, data }: AiDescriptorProps) => {

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.actions}>
                    {transformOptions.map(option => (
                        <button
                            key={option.id}
                            className={`${styles.actionButton}`}
                            
                        >
                            {option.icon}
                        </button>
                    ))}
                </div>
                <button onClick={onClose} className={styles.closeButton}>×</button>
            </header>
            <div className={styles.content}>
                {/* <div className={styles.selectedText}>
                    <p className={styles.textLabel}>Selected Text:</p>
                    <div className={styles.textContent}>
                        {text}
                    </div>
                </div> */}

                <div className={styles.results_container}>
                    <h3 className={styles.resultsTitle}>AI Suggestions</h3>
                    {loading && <Loader count={3} />}
                    {error && <p className={styles.error}>Error fetching AI suggestions</p>}

                    <div className={styles.resultsList}>
                        {data?.responses.map((result) => (
                            <button 
                                onClick={() => onInsert(result)} 
                                key={result} 
                                className={styles.result_item}
                            >
                                <p className={styles.result_text}>{result}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};