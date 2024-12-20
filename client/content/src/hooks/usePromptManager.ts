import { useState } from "react";


export const usePromptManager = () => {
    const [prompt, setPrompt] = useState<string>('');

    const handlePromptChange = (prompt:string) => {
        setPrompt(prompt)
    }

    const clearPrompt = ()=> {
        setPrompt('');
    }
    
      return {
        prompt,
        handlePromptChange,
        clearPrompt
      }

}