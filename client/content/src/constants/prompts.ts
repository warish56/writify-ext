import { Prompt } from "@/types/AiResponse";

export const promptPrefix = `If it contains new line then please aad a new line in it.`

export const PROMPT_ROLES = {
    SYSTEM: 'system' as const,
    USER: 'user' as const
}

type PromptItem = {
    title: string;
    description: string;
    prompt: Prompt
}

type PromptCategory = {
    heading: string;
    description: string;
    list: PromptItem[]
}

export const Prompts:Record<string, PromptCategory> = {
    analysis: {
        heading: 'Text Analysis',
        description: 'Prompts to perform textual analysis on the selected text',
        list: [
            {
                title: 'Summarize Text',
                description: 'Generate a concise summary of the selected text.',
                prompt: {
                   role: PROMPT_ROLES.SYSTEM,
                   content: `Generate a concise summary of the selected text. ${promptPrefix}`
                }
            },
            {
                title: 'Explain Text',
                description: 'Provide a detailed explanation or breakdown of the text.',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content: `Provide a detailed explanation or breakdown of the text. ${promptPrefix}`
                }
            },
            {
                title: 'Paraphrase',
                description: 'Reword the text while preserving its meaning.',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content: `Reword the text while preserving its meaning. ${promptPrefix}`
                }
            },
            {
                title: 'Define',
                description: 'Provide definitions for words or terms in the text.',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content: `Provide definitions for words or terms in the text. ${promptPrefix}`
                }
            },
            {
                title: 'Sentiment Analysis',
                description: 'Determine the tone or sentiment of the text (e.g., positive, negative, neutral).',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content:`Determine the tone or sentiment of the text (e.g., positive, negative, neutral). ${promptPrefix}`
                }
            },

        ]
    },

    productivity:{
        heading: 'Productivity',
        description: 'Prompts to do get most out of the selected text',
        list: [
            {
                title: 'Expand Text',
                description: 'Add more detail to the text.',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content:`Add more detail to the text. ${promptPrefix}`
                }
            },
            {
                title: 'Generate Questions',
                description: 'Create questions based on the selected text.',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content:`Create questions based on the selected text. ${promptPrefix}`
                }
            },
            {
                title: 'Answer Questions',
                 description: 'Provide answers related to the selected text.',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content:`Provide answers related to the selected text. ${promptPrefix}`
                }
            },
            {
                title: 'Shorten Text',
                 description: 'Make the text concise for tweets, summaries, etc.',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content:`Make the text concise for tweets, summaries, etc. ${promptPrefix}`
                }
            },
            {
                title: 'Correct Grammar',
                 description: 'Check and correct grammar in the text.',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content:`Check and correct grammar in the text. ${promptPrefix}`
                }
            },
            {
                title: 'Create Story',
                description: 'Use the text as a prompt to craft a story.',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content:`Use the text as a prompt to craft a story. ${promptPrefix}`
                }
            },
            {
                title: 'Generate a Poem',
                description: 'Turn the text into a poem.',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content:`Turn the text into a poem. ${promptPrefix}`
                }
            },
            {
                title: 'Extract Data',
                description: 'Identify names, dates, places, or numbers in the text',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content:`Identify names, dates, places, or numbers in the text. ${promptPrefix}`
                }
            },

        ]
    },

    custom:{
        heading: 'Custom Input',
        description: 'Enter the prompt of your choice',
        list: []
    }
}