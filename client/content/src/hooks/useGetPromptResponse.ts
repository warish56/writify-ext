import { useState, useEffect, useDeferredValue } from 'react';
import { BG_GET_AI_RESPONSE } from '@/constants';
import { PromptResponse } from '@/types/prompt';
import { useCredits } from './useCredits';
import { sendMessageToWorker } from '@/utils';

type AiResponseState = (PromptResponse | null)[] | (Error | null)[]

const fetchResponses = async (text: string, prompt:string) => {
    const response = await sendMessageToWorker(BG_GET_AI_RESPONSE, {text, prompt});
    return response;
}


export const useGetPromptResponse = (prompt:string, text:string) => {
    const {useAvailableCredits, isCreditsAvailable} = useCredits();
    const [response, setResponse] = useState<AiResponseState>([null, null]);
    const [loading, setLoading] = useState(false);
    const defferedText = useDeferredValue(text);
    
    const clearData = () => {
        setResponse([null, null])
    }

    const fetchData = async () => {
        setLoading(true);
        const data = await fetchResponses(text, prompt);
        const [_, error] = data
        setResponse(data);
        setLoading(false);
        if(!error){
            useAvailableCredits();  
        }     
    }
    

    useEffect(() => {
        if(defferedText && prompt && isCreditsAvailable) {
            fetchData();
        }
    }, [defferedText, prompt, isCreditsAvailable]);
    
    return {
        data: response[0] as PromptResponse | null, 
        error: response[1] as Error | null, 
        loading,
        clearData,
        refetchData: fetchData
    };
}