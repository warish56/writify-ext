const OpenAI = require("openai");

console.log("API KEY", process.env.GPT_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.GPT_API_KEY
});



const getAiResponse = async (text, prompt) => {
    const aiPrompt = `${prompt} - "${text}" `;

    console.log("AI PROMPT", aiPrompt);

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {"role": "user", "content": aiPrompt},
        ],
      });

    console.log(completion.choices[0].message.content); 
    return completion.choices[0].message.content;

}

module.exports = {
    getAiResponse
}