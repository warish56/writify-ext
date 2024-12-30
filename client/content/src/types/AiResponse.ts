
export type SummaryResponse = {
    result: string;
    suggestions: string[];
}

export type AiResponse = SummaryResponse
export type PromptRole = 'system' | 'user';
export type Prompt = {
    role: PromptRole,
    content: string
}