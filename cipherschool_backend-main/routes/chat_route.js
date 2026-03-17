const express = require("express");
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");
const ChatModel = require("../models/chat_model");
const protectedRoute = require("../middleware/protectedResource");

// Use the local API key or process.env directly
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyC4d8RZGa_8xX-RdvydYU8XvNkLJT78W30";

// Send message to chatbot
router.post("/chat/message", protectedRoute, async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user._id;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Get or create chat history
    let chatHistory = await ChatModel.findOne({ userId });

    if (!chatHistory) {
      chatHistory = new ChatModel({
        userId,
        messages: [],
      });
    }

    // Add user message to history
    chatHistory.messages.push({
      role: "user",
      content: message,
    });

    // We only keep the last 10 pairs (-20) since we need alternating user/model roles for strict APIs, 
    // but Gemini handles it fairly well if we map them.
    const recentMessages = chatHistory.messages.slice(-10);

    const historyForGemini = [];
    for (const msg of recentMessages) {
      // The role must be 'user' or 'model'
      const role = msg.role === "assistant" ? "model" : "user";
      historyForGemini.push({ role, parts: [{ text: msg.content }] });
    }

    // Extract the very last message as the current prompt
    const currentPrompt = historyForGemini.pop();

    const systemContext = {
      role: "user",
      parts: [
        {
          text: "System Context: You are a strict learning assistant for CipherSchool, a Study Management project. You MUST ONLY answer questions related to courses, programming, software engineering, education, and the CipherSchool platform. If a user asks a question unrelated to technology or education (like general life advice, non-educational chitchat, or unrelated topics), politely decline to answer and redirect them back to studying. Be friendly, encouraging, and educational. Format all responses in Markdown."
        }
      ],
    };

    const ackContext = {
      role: "model",
      parts: [{ text: "Understood. I'm ready to help students!" }],
    };

    let aiResponse = "";

    if (!GEMINI_API_KEY) {
      aiResponse = `I received your question: "${message}". Please set GEMINI_API_KEY on the backend server to enable real AI responses.`;
    } else {
      try {
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [systemContext, ackContext, ...historyForGemini, currentPrompt],
        });

        aiResponse = response.text || "No response generated.";
      } catch (llmError) {
        console.error("Gemini API Error:", llmError.message || llmError);
        aiResponse = "AI provider is currently unavailable. Please try again in a moment.";
      }
    }

    // Add AI response to history
    chatHistory.messages.push({
      role: "assistant",
      content: aiResponse,
    });

    chatHistory.updatedAt = new Date();
    await chatHistory.save();

    res.status(200).json({
      message: aiResponse,
      chatId: chatHistory._id,
    });
  } catch (error) {
    console.error("Chat error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to process message",
      details: error.response?.data?.error || error.message
    });
  }
});

// Get chat history
router.get("/chat/history", protectedRoute, async (req, res) => {
  try {
    const userId = req.user._id;
    const chatHistory = await ChatModel.findOne({ userId });

    if (!chatHistory) {
      return res.status(200).json({ messages: [] });
    }

    res.status(200).json({
      messages: chatHistory.messages,
      chatId: chatHistory._id
    });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

// Clear chat history
router.delete("/chat/clear", protectedRoute, async (req, res) => {
  try {
    const userId = req.user._id;
    await ChatModel.findOneAndDelete({ userId });
    res.status(200).json({ message: "Chat history cleared" });
  } catch (error) {
    console.error("Error clearing chat history:", error);
    res.status(500).json({ error: "Failed to clear chat history" });
  }
});

module.exports = router;
