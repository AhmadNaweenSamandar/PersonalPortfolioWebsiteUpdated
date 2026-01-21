// src/controllers/chat.controller.ts
import { Request, Response } from "express";
import { z } from "zod";
import { ChatService } from "../services/chat.services.js";

const chatService = new ChatService();

// Define Validation Schema here
const chatSchema = z.object({
  prompt: z.string().trim().min(1).max(1000),
  conversationId: z.string().uuid({ message: "Invalid UUID format" })
});

export const chatController = async (req: Request, res: Response): Promise<any> => {
  try {
    // 1. Validate Input (Zod)
    const parseResult = chatSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({ 
        errors: parseResult.error.flatten().fieldErrors 
      });
    }

    const { conversationId, prompt } = parseResult.data;

    // 2. Delegate work to Service
    const aiResponse = await chatService.processMessage(conversationId, prompt);

    // 3. Send Response
    res.json({ message: aiResponse });

  } catch (error: any) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};