const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { basicChain } = require('./chains/basicChain');
const { basicAgent } = require('./agents/basicAgent');
const { chatWithPersistence } = require('./chat/chatWithPersistence');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'JS LangServe API',
      version: '1.0.0',
      description: 'Express.js implementation of LangServe-like functionality',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 8083}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/server.js', './src/chains/*.js', './src/agents/*.js', './src/chat/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Redirect root to docs
app.get('/', (req, res) => {
  res.redirect('/docs');
});

// Serve the custom playground
app.get('/playground', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/playground.html'));
});

/**
 * @swagger
 * /chain/invoke:
 *   post:
 *     summary: Invoke the basic chain
 *     description: Processes a question through GPT-4 and returns an answer with a follow-up question
 *     tags: [Chain]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: The question to process
 *             example:
 *               question: "What is artificial intelligence?"
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 output:
 *                   type: string
 */
app.post('/chain/invoke', basicChain);

/**
 * @swagger
 * /agent/invoke:
 *   post:
 *     summary: Invoke the basic agent
 *     description: Processes input through an AI agent with specific tools
 *     tags: [Agent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               input:
 *                 type: string
 *                 description: The input to process
 *             example:
 *               input: "What does Eugene think about cats?"
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 output:
 *                   type: object
 */
app.post('/agent/invoke', basicAgent);

/**
 * @swagger
 * /chat/invoke:
 *   post:
 *     summary: Chat with persistence
 *     description: Maintains a conversation history while chatting with the AI
 *     tags: [Chat]
 *     parameters:
 *       - in: header
 *         name: session-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique session identifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               human_input:
 *                 type: string
 *                 description: The user's message
 *             example:
 *               human_input: "Hello, how are you?"
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 output:
 *                   type: string
 */
app.post('/chat/invoke', chatWithPersistence);

const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Documentation available at http://localhost:${PORT}/docs`);
  console.log(`Playground available at http://localhost:${PORT}/playground`);
}); 