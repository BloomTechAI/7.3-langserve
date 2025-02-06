const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const basicChain = async (req, res) => {
  try {
    const { question } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Answer the following question as best you can, and end the question with a follow up question"
        },
        {
          role: "user",
          content: question
        }
      ]
    });

    res.json({ output: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { basicChain }; 