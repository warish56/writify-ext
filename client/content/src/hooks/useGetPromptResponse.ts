import { useState, useEffect, useDeferredValue } from 'react';
import { BG_GET_AI_RESPONSE } from '@/constants';
import { PromptResponse } from '@/types/prompt';
import { useCredits } from './useCredits';
import { sendMessageToWorker } from '@/utils';
import { WorkerResponse } from '@/types/worker';
import { ServerError } from '@/types/api';
import { Prompt } from '@/types/AiResponse';
import { generatePrompt } from '@/utils/prompt';

type AiResponseState = [PromptResponse | null, | ServerError | null]

const fetchResponses = async (text: string, prompt:Prompt) => {
    const prompts = [
        {...prompt},
        {
            ...generatePrompt('user', text)
        }
    ]
    const response = await sendMessageToWorker<WorkerResponse<[PromptResponse|null, ServerError|null]>>(BG_GET_AI_RESPONSE, {prompts});
    return response;
}


export const useGetPromptResponse = (prompt:Prompt|null, text:string) => {
    const {useAvailableCredits, isCreditsAvailable} = useCredits();
    const [response, setResponse] = useState<AiResponseState>([null, null]);
    const [loading, setLoading] = useState(false);
    const defferedText = useDeferredValue(text);
    
    const clearData = () => {
        setResponse([null, null])
    }

    const fetchData = async () => {
        setLoading(true);
        const {success, error, data} = await fetchResponses(text, prompt as Prompt);
        if(success){
            setResponse(data);
        }
        setLoading(false);
        if(!error && !data?.[1]){
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