import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import z from 'zod';



dotenv.config();


const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

// accessing the key in a variable
const apiKey = process.env.GEMINI_API_KEY;

//handling error if the key is missing
if(!apiKey){
   console.error("ERROR: GEMINI_API_KEY is not set in .env file");
   process.exit(1);//stopping the server
}


// we will use map data structure for chat history
// gemini doesn't allow to restore individual messages, we need to retrive them all once
// so we create an array for previous messages
// mapping conversationId -> array of messages
// conv1 -> [1,2,3,5]
const conversationStore = new Map<string, any[]>()

// Initialize the API client with key
const genAI = new GoogleGenAI({apiKey: apiKey});

const chatSchema = z.object({
    prompt: z.string()
        .trim()
        .min(1, {message: 'Prompt is required'})
        .max(1000, {message: 'Prompt is too long(max 1000 characters)'}),
    conversationId: z.string().uuid()
});

//endpoint for receiving data from clients
app.post('/api/chat', async (req: Request, res: Response): Promise<any> => {
    try {

        const parseResult = chatSchema.safeParse(req.body);
        

        if (!parseResult.success) {
            return res.status(400).json({
                errors: parseResult.error.flatten().fieldErrors});
        }

        const { prompt, conversationId } = parseResult.data;

        // retrieve the existing history for this specific ID
        // if it doesn't exist yet, create an empty array
        let history = conversationStore.get(conversationId) || [];

        //add user's new message to the history
        history.push({
         role: "user",
         parts: [{text: prompt}]
        });       
        // 4. Await the response and extract text using the helper method
        // 3. Call generateContent on the model instance
        const response = await genAI.models.generateContent({
         model: "gemini-3-flash-preview",
         //send the full history to gemini
         contents: history //we send everything: old messages + new prompt
        })

        //accessing the text
        const text = response.text;

        // Add Gemini's answer to the history
        history.push({
         role: "model",
         parts: [{text: text}]
        })

        //save the updated history back to the Map
        conversationStore.set(conversationId, history);

        //send only latest answer to the frontend
        res.json({ message: text });

    } catch (error) {
        console.error('GenAI Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/', (req: Request, res: Response) => {
   res.send('Hello World!');
});

// Define a "GET" route. This means the server listens for browsers/clients
// asking to READ data from the specific URL path '/api/hello'.
// 'req' (Request) contains info about what the client sent (headers, params).
// 'res' (Response) is the tool we use to send an answer back.
app.get('/api/hello', (req: Request, res: Response) => {
   // .json() is a helper method that does three things automatically:
   // 1. Converts your JavaScript object { message: ... } into a JSON string.
   // 2. Sets the 'Content-Type' header to 'application/json' so the browser knows it's data, not HTML.
   // 3. Sends the response and closes the connection.
   res.json({ message: 'Hello World!' });
});




app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
