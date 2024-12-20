
const jsonFormatPromt = `Output the result only as plain JSON, without any additional text, explanations, or formatting. Ensure the JSON is valid and properly escaped so it can be parsed using JSON.parse in Node.js. `

export const SummaryPropmpt = {
    text: `Summarize the following text and provide multiple suggestions based on the content. The output should be formatted as a JSON object that can be parsed using JSON.parse. ${jsonFormatPromt} Use this structure:`,
    codeStructure: `
    {
        "result": "Summarized text goes here.",
        "suggestions": [
            "First suggestion goes here.",
            "Second suggestion goes here.",
            "Third suggestion goes here."
        ]
    }
    `,
    getPrompt: function(){
        return `${this.text} 
          ~~~
          ${this.codeStructure}
          ~~~
        `
    }
}



export const FormalPropmpt = {
    text: `Rewrite the following text in a formal tone. Additionally, provide multiple suggestions based on the content or how it can be improved. Format the output as a JSON object that can be parsed using JSON.parse. ${jsonFormatPromt} Use the following structure:`,
    codeStructure: `
    {
        "result": "Formal text goes here.",
        "suggestions": [
            "First suggestion goes here.",
            "Second suggestion goes here.",
            "Third suggestion goes here."
        ]
    }
    `,
    getPrompt: function(){
        return `${this.text} 
          ~~~
          ${this.codeStructure}
          ~~~
        `
    }
}

export const ConcisePropmpt = {
    text: `Rewrite the following text in a short and concise format. Additionally, provide multiple suggestions based on the content or its improvement. Format the output as a JSON object that can be parsed using JSON.parse. ${jsonFormatPromt} Use this structure:`,
    codeStructure: `
    {
        "result": "Short text goes here.",
        "suggestions": [
            "First suggestion goes here.",
            "Second suggestion goes here.",
            "Third suggestion goes here."
        ]
    }
    `,
    getPrompt: function(){
        return `${this.text} 
          ~~~
          ${this.codeStructure}
          ~~~
        `
    }
}

export const EllaboratedPropmpt = {
    text: `Rewrite the following text in a more elaborated and detailed format. Additionally, provide multiple suggestions based on the content or how it can be improved. Format the output as a JSON object that can be parsed using JSON.parse. ${jsonFormatPromt} Use this structure:`,
    codeStructure: `
    {
        "result": "Elaborated text goes here.",
        "suggestions": [
            "First suggestion goes here.",
            "Second suggestion goes here.",
            "Third suggestion goes here."
        ]
    }
    `,
    getPrompt: function(){
        return `${this.text} 
          ~~~
          ${this.codeStructure}
          ~~~
        `
    }
}