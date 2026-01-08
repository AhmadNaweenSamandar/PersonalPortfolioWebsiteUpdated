import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

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
