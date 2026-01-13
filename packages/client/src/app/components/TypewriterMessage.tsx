import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface TypewriterMessageProps {
   content: string;
   isNew: boolean; // Only animate if it's a fresh message
}

export const TypewriterMessage = ({
   content,
   isNew,
}: TypewriterMessageProps) => {
   const [displayedText, setDisplayedText] = useState('');
   const [isTyping, setIsTyping] = useState(false);
   const indexRef = useRef(0);

   useEffect(() => {
      // If it's not a new message (e.g., from history), show immediately
      if (!isNew) {
         setDisplayedText(content);
         return;
      }

      setIsTyping(true);
      setDisplayedText(''); // Start empty
      indexRef.current = 0;

      const intervalId = setInterval(() => {
         // Check if we reached the end
         if (indexRef.current < content.length) {
            // Add one character at a time
            setDisplayedText((prev) => prev + content.charAt(indexRef.current));
            indexRef.current += 1;
         } else {
            // Stop typing
            clearInterval(intervalId);
            setIsTyping(false);
         }
      }, 15); // <-- SPEED: Lower number = Faster typing (try 10-20ms)

      return () => clearInterval(intervalId);
   }, [content, isNew]);

   return (
      <div className="markdown-container">
         <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
               strong: ({ node, ...props }) => (
                  <span className="font-bold text-white" {...props} />
               ),
               a: ({ node, ...props }) => (
                  <a
                     className="text-[#C9A24D] underline"
                     target="_blank"
                     {...props}
                  />
               ),
               ul: ({ node, ...props }) => (
                  <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />
               ),
               ol: ({ node, ...props }) => (
                  <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />
               ),
               li: ({ node, ...props }) => <li className="pl-1" {...props} />,
               h1: ({ node, ...props }) => (
                  <h1
                     className="text-xl font-bold mb-2 text-[#C9A24D]"
                     {...props}
                  />
               ),
               h2: ({ node, ...props }) => (
                  <h2
                     className="text-lg font-bold mb-2 text-[#C9A24D]"
                     {...props}
                  />
               ),
               p: ({ node, ...props }) => (
                  <p
                     className="mb-2 last:mb-0 leading-relaxed inline"
                     {...props}
                  />
               ),
            }}
         >
            {displayedText}
         </ReactMarkdown>

         {/* The Blinking Cursor */}
         {isTyping && (
            <span className="inline-block w-2 h-4 ml-1 bg-[#C9A24D] animate-pulse align-middle" />
         )}
      </div>
   );
};
