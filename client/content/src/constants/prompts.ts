
const jsonFormatPromt = `Output the result only as plain JSON, without any additional text, explanations, or formatting. Ensure the JSON is valid and properly escaped so it can be parsed using JSON.parse in Node.js. `
const codeStructure = `Use this structure to output result, nothing more than this means no more extra keys: ~~~ { "result": "text goes here." } ~~~`



export const Prompts = {
    analysis: {
        heading: 'Text Analysis',
        list: [
            {
                title: 'Summarize Text',
                prompt: `Generate a concise summary of the selected text. ${jsonFormatPromt} ${codeStructure}`
            },
            {
                title: 'Explain Text',
                prompt: `Provide a detailed explanation or breakdown of the text. ${jsonFormatPromt} ${codeStructure}`
            },
            {
                title: 'Paraphrase',
                prompt: `Reword the text while preserving its meaning. ${jsonFormatPromt} ${codeStructure}`
            },
            {
                title: 'Define',
                prompt: `Provide definitions for words or terms in the text. ${jsonFormatPromt} ${codeStructure}`
            },
            {
                title: 'Sentiment Analysis',
                prompt: `Determine the tone or sentiment of the text (e.g., positive, negative, neutral). ${jsonFormatPromt} ${codeStructure}`
            },

        ]
    },

    productivity:{
        heading: 'Productivity',
        list: [
            {
                title: 'Expand Text',
                prompt: `Add more detail to the text. ${jsonFormatPromt} ${codeStructure}`
            },
            {
                title: 'Generate Questions',
                prompt: `Create questions based on the selected text. ${jsonFormatPromt} ${codeStructure}`
            },
            {
                title: 'Answer Questions',
                prompt: `Provide answers related to the selected text. ${jsonFormatPromt} ${codeStructure}`
            },
            {
                title: 'Shorten Text',
                prompt: `Make the text concise for tweets, summaries, etc. ${jsonFormatPromt} ${codeStructure}`
            },
            {
                title: 'Correct Grammar',
                prompt: `Check and correct grammar in the text. ${jsonFormatPromt} ${codeStructure}`
            },

        ]
    }
}