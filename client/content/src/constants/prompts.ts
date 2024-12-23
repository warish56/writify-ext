
export const jsonFormatPromt = `Output the result only as plain JSON, without any additional text, explanations, or formatting. Ensure the JSON is valid and properly escaped so it can be parsed using JSON.parse in Node.js. If it contains new line then please aad a new line in it.`
export const codeStructure = `Use this structure to output result, nothing more than this means no more extra keys: '{"result":"text goes here."}' `



export const Prompts = {
    analysis: {
        heading: 'Text Analysis',
        description: 'Prompts to perform textual analysis on the selected text',
        list: [
            {
                title: 'Summarize Text',
                description: 'Generate a concise summary of the selected text.',
                prompt: `Generate a concise summary of the selected text. ${jsonFormatPromt} ${codeStructure}`
            },
            {
                title: 'Explain Text',
                description: 'Provide a detailed explanation or breakdown of the text.',
                prompt: `Provide a detailed explanation or breakdown of the text. ${jsonFormatPromt} ${codeStructure}`
            },
            {
                title: 'Paraphrase',
                description: 'Reword the text while preserving its meaning.',
                prompt: `Reword the text while preserving its meaning. ${jsonFormatPromt} ${codeStructure}`
            },
            {
                title: 'Define',
                description: 'Provide definitions for words or terms in the text.',
                prompt: `Provide definitions for words or terms in the text. ${jsonFormatPromt} ${codeStructure}`
            },
            {
                title: 'Sentiment Analysis',
                description: 'Determine the tone or sentiment of the text (e.g., positive, negative, neutral).',
                prompt: `Determine the tone or sentiment of the text (e.g., positive, negative, neutral). ${jsonFormatPromt} ${codeStructure}`
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
                prompt: `Add more detail to the text. ${jsonFormatPromt} ${codeStructure}`
            },
            {
                title: 'Generate Questions',
                description: 'Create questions based on the selected text.',
                prompt: `Create questions based on the selected text. ${jsonFormatPromt} ${codeStructure}`
            },
            {
                title: 'Answer Questions',
                 description: 'Provide answers related to the selected text.',
                prompt: `Provide answers related to the selected text. ${jsonFormatPromt} ${codeStructure}`
            },
            {
                title: 'Shorten Text',
                 description: 'Make the text concise for tweets, summaries, etc.',
                prompt: `Make the text concise for tweets, summaries, etc. ${jsonFormatPromt} ${codeStructure}`
            },
            {
                title: 'Correct Grammar',
                 description: 'Check and correct grammar in the text.',
                prompt: `Check and correct grammar in the text. ${jsonFormatPromt} ${codeStructure}`
            },
            {
                title: 'Create Story',
                 description: 'Use the text as a prompt to craft a story.',
                prompt: `Use the text as a prompt to craft a story. ${jsonFormatPromt} ${codeStructure}`
            },
            {
                title: 'Generate a Poem',
                 description: 'Turn the text into a poem.',
                prompt: `Turn the text into a poem. ${jsonFormatPromt} ${codeStructure}`
            },
            {
                title: 'Extract Data',
                 description: 'Identify names, dates, places, or numbers in the text',
                prompt: `Identify names, dates, places, or numbers in the text. ${jsonFormatPromt} ${codeStructure}`
            },

        ]
    },

    custom:{
        heading: 'Custom Input',
        description: 'Enter the prompt of your choice',
        list: []
    }
}