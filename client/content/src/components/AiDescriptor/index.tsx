import React, { useEffect, useRef, useState } from 'react';
import styles from './style.module.css';


import { AiResponse } from '@/types/AiResponse';
import { Loader } from '@/components/Loader';



type AiDescriptorProps = {
    text?: string;
    data?: AiResponse|null;
    header?: React.ReactNode;
    loading: boolean;
    error: boolean;
    onInsert: (text: string) => void;
    onClose: () => void;
}


export const AiDescriptor = React.forwardRef( (props:AiDescriptorProps, ref) => {
    const { onInsert, onClose, header, loading, error, data } = props

    const [currentResult, setCurrentResult] = useState(data?.result ?? '');
    const mainTextContRef = useRef<HTMLDivElement|null>(null);


    const handleResultChange = (text:string) => {
        setCurrentResult(text);
        mainTextContRef.current?.scrollIntoView({block:'center', behavior:'smooth'})
    }

    useEffect(() => {
        if(data?.result){
            setCurrentResult(data.result)
        }
    }, [data])

    return (
        <div ref={ref} className={styles.container}>
            <header className={styles.header}>
                {header}
                <button onClick={onClose} className={styles.close_button}>
                    <span>×</span>
                </button>
            </header>
            <div className={styles.content}>
            {currentResult &&
                    <div ref={mainTextContRef} className={styles.suggested_cont}>
                        <div className={styles.suggested_heading_cont}>
                            <h3 className={styles.heading}>Suggestion</h3>
                            <button disabled={loading} onClick={() => onInsert(currentResult)} className={styles.chip}>
                                <span>Apply</span>
                            </button>
                        </div>
                        
                        <div style={{
                                opacity: loading ? 0.5 : 1
                            }} className={styles.selected_text}>
                                <span className={styles.text_content}>
                                    {currentResult}
                                </span>
                        </div>
                    </div>
                 }

                <div className={styles.results_container}>
                    <h3 className={styles.heading}>{ data ? 'More AI Suggestions' : 'Select Action'}</h3>
                    {loading && <Loader count={3} />}
                    {error && <p className={styles.error}>Error fetching AI suggestions</p>}

                    {!loading && !error &&
                        <div className={styles.resultsList}>
                        {data?.suggestions.map((result) => (
                            <button 
                                onClick={() => handleResultChange(result)} 
                                key={result} 
                                className={styles.result_item}
                            >
                                <p className={styles.result_text}>{result}</p>
                            </button>
                        ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
});