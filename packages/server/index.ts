import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';


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

// Initialize the API client with key
const genAI = new GoogleGenAI({apiKey: apiKey});

//endpoint for receiving data from clients
app.post('/api/chat', async (req: Request, res: Response): Promise<any> => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        
        
        // 4. Await the response and extract text using the helper method
        // 3. Call generateContent on the model instance
        const response = await genAI.models.generateContent({
         model: "gemini-3-flash-preview",
         contents: prompt,
        })

        //accessing the text
        const text = response.text;

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
