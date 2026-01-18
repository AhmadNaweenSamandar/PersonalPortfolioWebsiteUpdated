import { useEffect, useState } from 'react';
import { AskGabinaSection } from './app/components/AskGabinaSection';

function App() {
   // useState creates a piece of memory for this component.
   // 'message' holds the actual text we get from the server.
   // 'setMessage' is the function we use to update that text and trigger a re-render.
   // We initialize it with an empty string '' because we haven't fetched data yet.
   const [message, setMessage] = useState('');
   const [activeSection, setActiveSection] = useState('');

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

   useEffect(() => {
      const handleScroll = () => {
         // 1. DEFINE TARGETS
         // The specific IDs of the sections to be tracked in the DOM.
         const sections = ['projects', 'journey', 'events', 'contact'];
         /* 2. CALCULATE "READING LINE"
         We don't want to trigger the section exactly when it hits the very top (0px).
         We want it to trigger when it enters the user's primary focus area.
         Adding (window.innerHeight / 3) pushes the trigger point down about 33% of the screen height.
      */
         const scrollPosition = window.scrollY + window.innerHeight / 3;

         // 3. CHECK POSITIONS
         for (const sectionId of sections) {
            const element = document.getElementById(sectionId);

            if (element) {
               const offsetTop = element.offsetTop;
               const offsetBottom = offsetTop + element.offsetHeight;

               // Logic: Is the "Reading Line" inside this section's box?
               // (Is it below the top edge AND above the bottom edge?)
               if (
                  scrollPosition >= offsetTop &&
                  scrollPosition < offsetBottom
               ) {
                  setActiveSection(sectionId);
                  break; // Stop looking once we found the active one (Performance optimization)
               }
            }
         }

         // 4. HERO/TOP RESET
         // If the user scrolls all the way back up (to the Hero section),
         // we clear the active state so no nav link is highlighted.
         if (window.scrollY < 300) {
            setActiveSection('');
         }
      };

      // 5. ATTACH LISTENER
      // We use 'passive: true' by default in modern browsers, but explicit addEventListener is fine here.
      window.addEventListener('scroll', handleScroll);
      // Run once immediately on mount to highlight the correct section if the user refreshes midway down the page.
      handleScroll();

      // 6. CLEANUP (CRITICAL)
      // When this component unmounts (e.g., changing pages), remove the listener.
      // Fails to do this = Memory Leaks and console errors.
      return () => window.removeEventListener('scroll', handleScroll);
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
