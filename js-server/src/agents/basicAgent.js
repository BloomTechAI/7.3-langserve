const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const availableTools = {
  get_eugene_thoughts: {
    type: "function",
    function: {
      name: "get_eugene_thoughts",
      description: "Returns Eugene's thoughts on a topic",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "The topic to get thoughts about"
          }
        },
        required: ["query"]
      }
    }
  }
};

const executeFunction = async (name, args) => {
  if (name === "get_eugene_thoughts") {
    const { query } = JSON.parse(args);
    return `Eugene thinks that ${query} is quite interesting!`;
  }
  throw new Error(`Unknown function: ${name}`);
};

const basicAgent = async (req, res) => {
  try {
    const { input, tools = ['get_eugene_thoughts'] } = req.body;

    const selectedTools = tools
      .filter(tool => availableTools[tool])
      .map(tool => availableTools[tool]);

    const messages = [
      { 
        role: "system", 
        content: "You are an AI assistant that MUST use the get_eugene_thoughts function whenever " +
                "someone asks about Eugene's thoughts or opinions. You are not allowed to make up " +
                "or imagine Eugene's thoughts - you must call the function to get them. " +
                "After getting Eugene's thoughts, you can elaborate or add context to the response."
      },
      { role: "user", content: input }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
      tools: selectedTools,
    });

    let response = completion.choices[0].message;
    console.log("Initial response:", response);

    if (response.tool_calls) {
      console.log("Executing tool calls:", response.tool_calls);
      const toolResults = await Promise.all(
        response.tool_calls.map(async (toolCall) => {
          const result = await executeFunction(
            toolCall.function.name,
            toolCall.function.arguments
          );
          return {
            role: "tool",
            tool_call_id: toolCall.id,
            content: result
          };
        })
      );

      messages.push(response);
      messages.push(...toolResults);

      const finalCompletion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: messages,
        tools: selectedTools,
      });

      response = finalCompletion.choices[0].message;
    } else {
      console.log("No tool calls made");
    }

    res.json({ 
      output: response,
      debug: {
        toolCallsMade: !!completion.choices[0].message.tool_calls,
        numberOfToolCalls: completion.choices[0].message.tool_calls ? 
          completion.choices[0].message.tool_calls.length : 0,
        initialResponse: completion.choices[0].message
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { basicAgent }; 