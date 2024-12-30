import { Prompt } from "@/types/AiResponse";
import { useState } from "react";


export const usePromptManager = () => {
    const [prompt, setPrompt] = useState<Prompt|null>(null);

    const handlePromptChange = (prompt:Prompt) => {
        setPrompt(prompt)
    }

    const clearPrompt = ()=> {
        setPrompt(null);
    }
    
      return {
        prompt,
        handlePromptChange,
        clearPrompt
      }

}