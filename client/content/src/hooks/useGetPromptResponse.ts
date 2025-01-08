import { useState, useEffect, useDeferredValue } from 'react';
import { useCredits } from './useCredits';
import { Prompt } from '@/types/AiResponse';
import { generatePrompt } from '@/utils/prompt';



const getRequestPrompt = (text: string, prompt:Prompt) => {
    return [
        {...prompt},
        {
            ...generatePrompt('user', text)
        }
    ]
}

export const useGetPromptResponse = (prompt:Prompt|null, text:string) => {
    const {useAvailableCredits, isCreditsAvailable} = useCredits();
    const [error, setError] = useState('');
    const [chunks, setChunks] = useState<string[]>([]);
    const defferedText = useDeferredValue(text);
    
    const clearChunks = () => {
        setChunks([]);
    }

    const clearData = () => {
        clearChunks();
    }

    const fetchData = async () => {
        const port = chrome.runtime.connect({name: "AI_MESSAGE"});
        port.postMessage({action: "GET", prompts: getRequestPrompt(text, prompt as Prompt)});
        port.onMessage.addListener(function(msg) {
            if(msg.error){
                setError(msg.error);
            }else if(msg.action === 'AI_RESPONSE'){
                setChunks(prevVal => [...prevVal, msg.content]);
            }else if(msg.action === 'DONE'){
                useAvailableCredits(); 
                port.disconnect();
            }
        });  
    }

    const refetchData = async () => {
        clearData();
        fetchData();
    }
    

    useEffect(() => {
        if(defferedText && prompt && isCreditsAvailable) {
            clearChunks();
            fetchData();
        }
    }, [defferedText, prompt, isCreditsAvailable]);
    
    return {
        error, 
        chunks,
        clearData,
        refetchData
    };
}