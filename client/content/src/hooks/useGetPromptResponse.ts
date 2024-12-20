import { useState, useEffect, useDeferredValue } from 'react';
import { BG_GET_AI_RESPONSE } from '@/constants';
import { PromptResponse } from '@/types/Prompt';

type AiResponseState = (PromptResponse | null)[] | (Error | null)[]

const fetchResponses = async (text: string, prompt:string) => {
    const response = await chrome.runtime.sendMessage({type: BG_GET_AI_RESPONSE, text, prompt});
    return response;
}


export const useGetPromptResponse = (prompt:string, text:string) => {
    const [response, setResponse] = useState<AiResponseState>([null, null]);
    const [loading, setLoading] = useState(false);
    const defferedText = useDeferredValue(text);
    
    const clearData = () => {
        setResponse([null, null])
    }

    const fetchData = async () => {
        setLoading(true);
        const data = await fetchResponses(text, prompt);
        setResponse(data);
        setLoading(false);
    }
    

    useEffect(() => {
        if(defferedText && prompt) {
            fetchData();
        }
    }, [defferedText, prompt]);
    
    return {
        data: response[0] as PromptResponse | null, 
        error: response[1] as Error | null, 
        loading,
        clearData,
        refetchData: fetchData
    };
}