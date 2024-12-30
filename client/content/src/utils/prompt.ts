import { PromptRole } from "@/types/AiResponse";


export const doesContainsCode = (text:string) => {

    const codePattern = /(```[\s\S]*?```|<code>[\s\S]*?<\/code>|<pre>[\s\S]*?<\/pre>|[{}();<>=]|def\s|class\s|import\s|if\s|while\s|for\s|try\s|catch\s)/;
    const codePatternPassed =  codePattern.test(text);

    const markupPattern = /(```|<code>|<\/code>|<pre>|<\/pre>)/;
    const markupPatternPassed =  markupPattern.test(text);

    return codePatternPassed || markupPatternPassed;
}



export const generatePrompt = (role: PromptRole,  text:string) => {
    return {
        role,
        content: text
    }
}
