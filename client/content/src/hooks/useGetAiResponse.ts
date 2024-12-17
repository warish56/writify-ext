import { useState, useEffect, useDeferredValue } from 'react';
import { BG_GET_AI_RESPONSE } from '@/constants';
import { AiResponse } from '@/types/AiResponse';

type AiResponseState = (AiResponse | null)[] | (Error | null)[]

const fetchResponses = async (text: string, prompt:string) => {
    const response = await chrome.runtime.sendMessage({type: BG_GET_AI_RESPONSE, text, prompt});
    return response;
}


export const useGetAiResponse = (prompt:string, text:string) => {
    const [response, setResponse] = useState<AiResponseState>([null, null]);
    const [loading, setLoading] = useState(false);
    const defferedText = useDeferredValue(text);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await fetchResponses(text, prompt);
            setResponse(data);
            setLoading(false);
        }

        if(defferedText) {
            fetchData();
        }
    }, [defferedText, prompt]);
    return {
        data: response[0] as AiResponse | null, 
        error: response[1] as Error | null, 
        loading
    };
}