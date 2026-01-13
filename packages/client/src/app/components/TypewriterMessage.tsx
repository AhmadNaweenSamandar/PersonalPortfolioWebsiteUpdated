import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface TypewriterMessageProps {
   content: string;
   isNew: boolean;
}

export const TypewriterMessage = ({
   content,
   isNew,
}: TypewriterMessageProps) => {
   const [displayedText, setDisplayedText] = useState('');
   const [isTyping, setIsTyping] = useState(false);
   const indexRef = useRef(0);

   useEffect(() => {
      // 1. If it's an old message, show full content immediately
      if (!isNew) {
         setDisplayedText(content);
         setIsTyping(false);
         return;
      }

      // 2. If it's new, prepare for typing
      setIsTyping(true);
      setDisplayedText('');
      indexRef.current = 0;

      // 3. The Typing Loop
      const intervalId = setInterval(() => {
         // Increment index first
         indexRef.current++;

         // Safely slice the string from 0 to current index
         // This prevents "missing first char" or "undefined" errors
         if (indexRef.current <= content.length) {
            setDisplayedText(content.slice(0, indexRef.current));
         } else {
            // Stop when we reach the end
            clearInterval(intervalId);
            setIsTyping(false);
         }
      }, 15); // Speed: 15ms

      // Cleanup interval on unmount
      return () => clearInterval(intervalId);
   }, [content, isNew]);

   return (
      <div className="markdown-container text-left">
         <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
               strong: ({ node, ...props }) => (
                  <span className="font-bold text-white" {...props} />
               ),
               a: ({ node, ...props }) => (
                  <a
                     className="text-[#C9A24D] underline hover:text-[#D1D1D1]"
                     target="_blank"
                     rel="noopener noreferrer"
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
                  <p className="mb-2 last:mb-0 leading-relaxed" {...props} />
               ), // Removed 'inline' to fix layout
            }}
         >
            {displayedText}
         </ReactMarkdown>

         {/* Blinking Cursor */}
         {isTyping && (
            <span className="inline-block w-1.5 h-4 ml-0.5 bg-[#C9A24D] animate-pulse align-middle" />
         )}
      </div>
   );
};
