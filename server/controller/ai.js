const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.GPT_API_KEY
});



const getAiResponse = async (prompts) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: prompts,
      });

    return completion.choices[0].message.content;

}

module.exports = {
    getAiResponse
}