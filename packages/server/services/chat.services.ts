// src/services/chat.service.ts
import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from "@google/genai";
import { ChatRepository } from "../repositories/chat.repository.js";
import dotenv from 'dotenv';
import { RESUME_DATA } from "../constants/portfolioData.js";

dotenv.config();


export class ChatService {
  private ai: GoogleGenAI;
  private chatRepo: ChatRepository;

  constructor() {
    // Initialize API Client
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is not set");
    
    this.ai = new GoogleGenAI({ apiKey });
    this.chatRepo = new ChatRepository();
  }

  async processMessage(conversationId: string, userMessage: string) {
    // 1. Get previous history from Repository
    const history = await this.chatRepo.getHistory(conversationId);

    // 2. Add user's new message
    history.push({
      role: "user",
      parts: [{ text: userMessage }]
    });

    // 3. Call Gemini API
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      // ADD THIS BLOCK:
      
      // 1. AI Persona and Knowledge about Ahmad
      config: {
        safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  
  ],
        systemInstruction: {
            parts: [{ text: RESUME_DATA }]
        }
      },
      contents: history,
    });

    const aiText = response.text;
    if (!aiText) throw new Error("AI response was empty or blocked");

    // 4. Add AI's answer to history
    history.push({
      role: "model",
      parts: [{ text: aiText }]
    });

    // 5. Save updated history back to Repository
    await this.chatRepo.saveHistory(conversationId, history);

    return aiText;
  }
}