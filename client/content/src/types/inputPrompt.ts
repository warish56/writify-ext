

export type InputPrompts = 'summarize' | 'formal' | 'concise' | 'ellaborate'

export type InputPromptAction = {
    id: InputPrompts;
    label: Capitalize<InputPrompts>;
    icon: React.ReactNode;
    prompt: string;
}