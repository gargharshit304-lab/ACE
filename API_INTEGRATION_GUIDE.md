# 🤖 AI Integration Guide

This guide shows how to integrate various AI services with your chatbot backend.

## 🔗 OpenAI Integration (GPT-4)

### Installation

```bash
npm install openai
```

### Setup

1. Get an API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add to `.env`:
```
OPENAI_API_KEY=sk-your-key-here
```

### Implementation

Replace the `generateAIResponse` function in `server.js`:

```javascript
const { OpenAI } = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateAIResponse(userMessage) {
  try {
    const message = await client.messages.create({
      model: 'gpt-4',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
    });

    return message.content[0].text;
  } catch (error) {
    console.error('OpenAI Error:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
}
```

Update the `/chat` endpoint to use async:

```javascript
app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const reply = await generateAIResponse(message.trim());
    res.json({ reply });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

---

## 🦜 Hugging Face Integration

### Installation

```bash
npm install @huggingface/inference
```

### Setup

1. Get an API key from [Hugging Face](https://huggingface.co/settings/tokens)
2. Add to `.env`:
```
HUGGINGFACE_API_KEY=hf_your-key-here
```

### Implementation

```javascript
const { HfInference } = require('@huggingface/inference');

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

async function generateAIResponse(userMessage) {
  try {
    const response = await hf.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.1',
      inputs: userMessage,
      parameters: {
        max_new_tokens: 256,
        temperature: 0.7,
      },
    });

    return response.generated_text;
  } catch (error) {
    console.error('Hugging Face Error:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
}
```

---

## 🔮 Google Gemini Integration

### Installation

```bash
npm install @google/generative-ai
```

### Setup

1. Get an API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Add to `.env`:
```
GOOGLE_API_KEY=your-key-here
```

### Implementation

```javascript
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function generateAIResponse(userMessage) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Google Gemini Error:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
}
```

---

## 🟦 Anthropic Claude Integration

### Installation

```bash
npm install @anthropic-ai/sdk
```

### Setup

1. Get an API key from [Anthropic Console](https://console.anthropic.com/)
2. Add to `.env`:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### Implementation

```javascript
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function generateAIResponse(userMessage) {
  try {
    const message = await client.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
    });

    return message.content[0].text;
  } catch (error) {
    console.error('Claude Error:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
}
```

---

## 🚀 Cohere Integration

### Installation

```bash
npm install cohere-ai
```

### Setup

1. Get an API key from [Cohere Dashboard](https://dashboard.cohere.com/api-keys)
2. Add to `.env`:
```
COHERE_API_KEY=your-key-here
```

### Implementation

```javascript
const { CohereClient } = require('cohere-ai');

const client = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

async function generateAIResponse(userMessage) {
  try {
    const response = await client.generate({
      prompt: userMessage,
      maxTokens: 256,
      temperature: 0.8,
    });

    return response.generations[0].text.trim();
  } catch (error) {
    console.error('Cohere Error:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
}
```

---

## 🤖 Local LLM with Ollama

### Installation

1. Install [Ollama](https://ollama.ai)
2. Run a model:
```bash
ollama run mistral
```
or
```bash
ollama run llama2
```

### Implementation (No API key needed!)

```javascript
async function generateAIResponse(userMessage) {
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral',
        prompt: userMessage,
        stream: false,
      }),
    });

    const data = await response.json();
    return data.response.trim();
  } catch (error) {
    console.error('Ollama Error:', error);
    return 'Sorry, I could not reach the local model. Make sure Ollama is running.';
  }
}
```

---

## 🗂️ Chat History / Context

To maintain conversation context, modify the endpoint:

```javascript
const conversationHistory = [];

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Add user message to history
    conversationHistory.push({
      role: 'user',
      content: message.trim(),
    });

    // Send full history to AI
    const reply = await generateAIResponse(conversationHistory);

    // Add AI reply to history
    conversationHistory.push({
      role: 'assistant',
      content: reply,
    });

    res.json({ reply });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

Then update your AI function to accept history:

```javascript
// For OpenAI with history
async function generateAIResponse(conversationHistory) {
  const message = await client.messages.create({
    model: 'gpt-4',
    max_tokens: 1024,
    messages: conversationHistory,
  });

  return message.content[0].text;
}
```

---

## 💾 Database Integration (Optional)

Store messages in a database for persistence:

### Using MongoDB + Mongoose

```bash
npm install mongoose
```

```javascript
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  role: String,
  content: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

// In your /chat endpoint
const userMsg = new Message({ role: 'user', content: message });
await userMsg.save();

const aiMsg = new Message({ role: 'assistant', content: reply });
await aiMsg.save();
```

---

## 🔐 Security Tips

1. **Never expose API keys in frontend** - Always keep them in `.env`
2. **Validate input** - Check message length, content type
3. **Rate limiting** - Prevent abuse
4. **Error handling** - Don't expose sensitive errors to frontend
5. **HTTPS** - Use in production
6. **CORS** - Restrict to your domain

### Simple Rate Limiting Example

```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.post('/chat', limiter, async (req, res) => {
  // ... your code
});
```

---

## 🧪 Testing Different Providers

Quick comparison script to test multiple providers:

```bash
# Test with environment variables
OPENAI_API_KEY=sk-... npm start

# Or test locally with Ollama
ollama run mistral
# Then run the server
npm start
```

---

## 📊 Comparison Chart

| Provider | Speed | Cost | Quality | Setup |
|----------|-------|------|---------|-------|
| OpenAI (GPT-4) | Fast | $$$ | Excellent | Easy |
| Anthropic (Claude) | Fast | $$$ | Excellent | Easy |
| Google (Gemini) | Fast | $ | Good | Easy |
| Cohere | Medium | $ | Good | Easy |
| Hugging Face | Medium | $ | Good | Medium |
| Ollama (Local) | Varies | Free | Good | Hard |

Choose based on your needs:
- **Best quality**: GPT-4 or Claude
- **Best value**: Google Gemini or Cohere
- **Privacy**: Ollama (runs locally)
- **Budget**: Hugging Face or Cohere

---

Enjoy building! 🚀
