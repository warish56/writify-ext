import { InputPrompts } from "@/types/inputPrompt";
import { useState } from "react";

type PromptState = {
    text: string;
    type: InputPrompts | null
  }
  
  const initialPromptData = {
    text:'', 
    type: null 
  }

  
export const useInputPromptManager = () =>{
    const [promptData, setPromptData] = useState<PromptState>(initialPromptData);

    const handlePromptChange = (prompt:string, type:InputPrompts) => {
        setPromptData({text: prompt, type})
    }

    const clearPromptData = ()=> {
        setPromptData(initialPromptData);
    }

    return {
        promptData,
        handlePromptChange,
        clearPromptData
    }

}