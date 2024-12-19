

export type Prompts = 'summarize' | 'formal' | 'concise' | 'ellaborate'

export type PromptAction = {
    id: Prompts;
    label: Capitalize<Prompts>;
    icon: React.ReactNode;
    prompt: string;
}