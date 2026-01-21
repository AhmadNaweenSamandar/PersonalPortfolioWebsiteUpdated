import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import { chatController } from './controller/chat.controller.js';
import cors from 'cors';


dotenv.config();


const app = express();

// 1. CORS Allow Frontend Connection
app.use(cors({
  origin: "http://localhost:5173", // front end server link
  methods: ["POST", "GET"],
  allowedHeaders: ["Content-Type"]
}));


app.use(express.json());

const port = process.env.PORT || 5000;

//routes
app.post('/api/chat', chatController);

app.get('/', (req: Request, res: Response) => {
   res.send('Server is ready and running!');
});


app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
