const OpenAI = require('openai');
const fs = require('fs').promises;
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const CHAT_HISTORY_DIR = path.join(__dirname, '../../chat_histories');

const chatWithPersistence = async (req, res) => {
  try {
    const { human_input } = req.body;
    const sessionId = req.headers['session-id'];

    // Ensure chat history directory exists
    await fs.mkdir(CHAT_HISTORY_DIR, { recursive: true });
    
    // Load or initialize chat history
    const historyPath = path.join(CHAT_HISTORY_DIR, `${sessionId}.json`);
    let history = [];
    
    try {
      const historyData = await fs.readFile(historyPath, 'utf8');
      history = JSON.parse(historyData);
    } catch (error) {
      // No history exists yet
    }

    // Add new message to history
    history.push({ role: "user", content: human_input });

    // Get AI response
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You're an assistant by the name of Bob." },
        ...history
      ]
    });

    const aiResponse = completion.choices[0].message;
    history.push(aiResponse);

    // Save updated history
    await fs.writeFile(historyPath, JSON.stringify(history));

    res.json({ output: aiResponse.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { chatWithPersistence }; 