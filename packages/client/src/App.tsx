import { useEffect, useState } from 'react';
import { AskGabinaSection } from './app/components/AskGabinaSection';

function App() {
   // useState creates a piece of memory for this component.
   // 'message' holds the actual text we get from the server.
   // 'setMessage' is the function we use to update that text and trigger a re-render.
   // We initialize it with an empty string '' because we haven't fetched data yet.
   const [message, setMessage] = useState('');

   // useEffect handles "side effects" — things that happen outside the UI, like fetching data.
   // The empty array [] at the end is the "dependency array."
   // It tells React: "Only run this code ONCE when the component first loads (mounts)."
   useEffect(() => {
      // fetch initiates a network request.
      // Notice we use a relative path '/api/hello'. We don't need 'http://localhost:5000'
      // because the Vite Proxy (configured below) will handle the routing for us.
      fetch('/api/hello')
         // fetch returns a "Promise" (a placeholder for a future value).
         // .then() waits for the server to reply.
         // res.json() takes the raw response stream and parses it into a usable JavaScript object.
         .then((res) => res.json())
         // This second .then() runs when the parsing is finished.
         // 'data' is the object { message: 'Hello World!' } from the backend.
         // We pass 'data.message' into setMessage to update our state.
         .then((data) => setMessage(data.message));
   }, []);

   // The component renders this HTML.
   // Initially, {message} is empty. Once the fetch finishes and state updates,
   // React automatically re-runs this part and displays "Hello World!".
   return (
      <div className="min-h-screen bg-[#0F0F0F]">
         <main>
            <AskGabinaSection />
         </main>
      </div>
   );
}

export default App;
