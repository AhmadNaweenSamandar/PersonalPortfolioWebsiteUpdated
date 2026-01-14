import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Send, X, Sparkles } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid'; // UUID generator imported
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { TypewriterMessage } from './TypewriterMessage';

interface Message {
   role: 'user' | 'assistant';
   content: string;
   id?: string; // Optional: helps with keys
   alreadyAnimated?: boolean; // New flag to check whether the message is written character by character (LLM text generation effect) by Typewritter
}

export function AskGabinaSection() {
   const [isOpen, setIsOpen] = useState(false);
   const [messages, setMessages] = useState<Message[]>([]);
   const [input, setInput] = useState('');
   const [highlightName, setHighlightName] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [conversationId, setConversationId] = useState('');
   // 2. Create a reference for the bottom of the chat
   const messagesEndRef = useRef<HTMLDivElement>(null);
   //reference to parent div to solve the scroll problem
   const scrollContainerRef = useRef<HTMLDivElement>(null);

   // 3. The Scroll Function
   const scrollToBottomSmooth = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
   };

   // Use this for typing (Instant/Auto) - keeps up with the speed
   // const scrollToBottomInstant = () => {
   //    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
   // };
   // scrollToBottomInstant is replace with following function
   // it calculates the exact pixel height and force the window to jump their immediately
   const forceScrollToBottom = () => {
      if (scrollContainerRef.current) {
         const { scrollHeight, clientHeight } = scrollContainerRef.current;
         // Sets the scroll position to the maximum possible height
         scrollContainerRef.current.scrollTop = scrollHeight - clientHeight;
      }
   };

   // 4. Trigger scroll whenever messages change or loading starts/stops
   useEffect(() => {
      scrollToBottomSmooth();
   }, [messages, isLoading, isOpen]); // Added isOpen so it scrolls when you first open it

   // 1. GENERATE OR RETRIEVE UUID ON LOAD
   useEffect(() => {
      // Check if user already has a chat ID in their browser
      let storedId = localStorage.getItem('chat_conversation_id');

      if (!storedId) {
         // If not, generate a new random UUID
         storedId = uuidv4();
         // Save it so we remember them next time
         localStorage.setItem('chat_conversation_id', storedId);
      }

      setConversationId(storedId);
   }, []);

   const handleSend = async () => {
      if (!input.trim() || isLoading) return;

      const userText = input;
      setInput('');
      setIsLoading(true);
      // Add user message immediately
      setMessages((prev) => [
         // Mark all OLD messages as already animated
         ...prev.map((m) => ({ ...m, alreadyAnimated: true })),
         // Add NEW user message
         { role: 'user', content: userText, alreadyAnimated: true },
      ]);

      try {
         // 2. SEND REQUEST TO YOUR CONTROLLER
         const response = await fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               prompt: userText,
               conversationId: conversationId, // Send the UUID we generated
            }),
         });

         const data = await response.json();

         if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch');
         }

         // 3. Update State with AI Response
         setMessages((prev) => [
            // Keep everything marked as animated
            ...prev.map((m) => ({ ...m, alreadyAnimated: true })),

            // Add AI response (alreadyAnimated: FALSE triggers the typewriter)
            {
               role: 'assistant',
               content: data.message,
               alreadyAnimated: false,
            },
         ]);
      } catch (error) {
         console.error('Chat Error:', error);
         setMessages((prev) => [
            ...prev,
            {
               role: 'assistant',
               content: 'I am sleeping now. Try again later!',
               alreadyAnimated: true, // Don't animate errors
            },
         ]);
      } finally {
         setIsLoading(false);
      }
   };

   const suggestedQuestions = [
      'What are Ahmad technical skills?',
      'Tell me about Ahmad experience',
      'What projects has Ahmad worked on?',
      'What makes Ahmad a great team member?',
   ];

   const handleOpen = () => {
      setIsOpen(true);
      setHighlightName(true);
      setTimeout(() => setHighlightName(false), 2000);
   };

   const handleQuestionClick = (question: string) => {
      setInput(question);
   };

   return (
      <section className="py-12 sm:py-16 lg:py-20 bg-[#1A1A1A]">
         <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
               <div className="text-center mb-6 sm:mb-8">
                  <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
                     <h2 className="text-3xl sm:text-4xl font-bold text-[#D1D1D1]">
                        Ask Gabina
                     </h2>
                     <motion.div
                        animate={{
                           rotateY: [0, 180, 360],
                        }}
                        transition={{
                           duration: 3,
                           repeat: Infinity,
                           ease: 'easeInOut',
                        }}
                     >
                        <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-[#C9A24D]" />
                     </motion.div>
                  </div>
                  <p className="text-lg sm:text-xl text-[#D1D1D1]">
                     Why{' '}
                     <motion.span
                        className="font-bold relative inline-block"
                        animate={
                           highlightName
                              ? {
                                   backgroundColor: [
                                      'rgba(201, 162, 77, 0)',
                                      'rgba(201, 162, 77, 0.3)',
                                      'rgba(201, 162, 77, 0)',
                                   ],
                                   scale: [1, 1.1, 1],
                                }
                              : {}
                        }
                        transition={{ duration: 1.5 }}
                     >
                        Ahmad Naween Samandar
                     </motion.span>{' '}
                     is a perfect match for your team!
                  </p>
               </div>

               <motion.div
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
               >
                  {/* Animated border light */}
                  <motion.div
                     className="absolute inset-0 rounded-2xl"
                     style={{
                        background:
                           'linear-gradient(90deg, #C9A24D, #0F0F0F, #C9A24D)',
                        backgroundSize: '200% 100%',
                        padding: '2px',
                     }}
                     animate={{
                        backgroundPosition: ['0% 50%', '200% 50%', '0% 50%'],
                     }}
                     transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                     }}
                  >
                     <div className="w-full h-full bg-[#1A1A1A] rounded-2xl" />
                  </motion.div>

                  <div className="relative bg-[#1A1A1A] rounded-2xl p-4 sm:p-6 shadow-lg">
                     <div className="flex gap-3">
                        <input
                           type="text"
                           value={input}
                           onChange={(e) => setInput(e.target.value)}
                           onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                           onClick={handleOpen}
                           placeholder="Ask anything about me..."
                           className="flex-1 px-4 py-3 bg-[#0F0F0F] border border-[#C9A24D]/30 text-[#D1D1D1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A24D] placeholder-[#D1D1D1]/50 text-sm sm:text-base"
                        />
                        <button
                           onClick={handleSend}
                           className="px-4 sm:px-6 py-3 bg-[#C9A24D] text-[#0F0F0F] rounded-xl hover:shadow-lg hover:shadow-[#C9A24D]/30 transition-shadow flex items-center gap-2 font-semibold"
                        >
                           <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                     </div>
                  </div>
               </motion.div>
            </div>
         </div>

         {/* Chat Popup */}
         <AnimatePresence>
            {isOpen && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                  onClick={() => setIsOpen(false)}
               >
                  <motion.div
                     initial={{ scale: 0.9, opacity: 0, y: 20 }}
                     animate={{ scale: 1, opacity: 1, y: 0 }}
                     exit={{ scale: 0.9, opacity: 0, y: 20 }}
                     transition={{ type: 'spring', damping: 25 }}
                     onClick={(e) => e.stopPropagation()}
                     className="bg-[#1A1A1A] rounded-3xl shadow-2xl w-full max-w-4xl h-[600px] flex flex-col border border-[#C9A24D]/30"
                  >
                     {/* Header */}
                     <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#C9A24D]/30">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#C9A24D] rounded-full flex items-center justify-center">
                              <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-[#0F0F0F]" />
                           </div>
                           <div>
                              <h3 className="font-bold text-lg sm:text-xl text-[#D1D1D1]">
                                 Ask Gabina
                              </h3>
                              <p className="text-xs sm:text-sm text-[#D1D1D1]/70">
                                 AI Assistant
                              </p>
                           </div>
                        </div>
                        <button
                           onClick={() => setIsOpen(false)}
                           className="p-2 hover:bg-[#C9A24D]/20 rounded-full transition-colors"
                        >
                           <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#D1D1D1]" />
                        </button>
                     </div>

                     {/* Suggested Questions */}
                     {messages.length === 0 && (
                        <div className="p-4 sm:p-6 border-b border-[#C9A24D]/30 bg-[#0F0F0F]">
                           <p className="text-sm text-[#D1D1D1]/70 mb-3">
                              Suggested questions:
                           </p>
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {suggestedQuestions.map((question, idx) => (
                                 <button
                                    key={idx}
                                    onClick={() =>
                                       handleQuestionClick(question)
                                    }
                                    className="text-left p-3 bg-[#1A1A1A] border border-[#C9A24D]/30 rounded-xl hover:border-[#C9A24D] hover:shadow-md hover:shadow-[#C9A24D]/20 transition-all text-sm text-[#D1D1D1]"
                                 >
                                    <Sparkles className="w-4 h-4 text-[#C9A24D] inline mr-2" />
                                    {question}
                                 </button>
                              ))}
                           </div>
                        </div>
                     )}

                     {/* Messages */}
                     {/* {the hide property for scrol bar is implemented at inline css tailwind code} */}
                     <div
                        ref={scrollContainerRef} // <--- NEW REF to scroll container for scrolling bug fix
                        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-hide"
                        style={{
                           scrollbarWidth: 'none' /* Firefox */,
                           msOverflowStyle: 'none' /* IE and Edge */,
                        }}
                     >
                        {' '}
                        {/* This internal style tag hides it for Chrome/Safari/Opera */}
                        <style>{`
                              div::-webkit-scrollbar {
                                 display: none;
                              }
                           `}</style>
                        {messages.map((message, idx) => (
                           <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                           >
                              <div
                                 className={`max-w-[85%] sm:max-w-[70%] p-4 rounded-2xl text-sm sm:text-base ${
                                    message.role === 'user'
                                       ? 'bg-[#C9A24D] text-[#0F0F0F]'
                                       : 'bg-[#0F0F0F] text-[#D1D1D1] border border-[#C9A24D]/30'
                                 }`}
                              >
                                 <div ref={messagesEndRef} />
                                 {message.role === 'assistant' ? (
                                    <TypewriterMessage
                                       content={message.content}
                                       // If it's from history (true) -> Don't animate
                                       // If it's brand new (false) -> Animate
                                       isNew={!message.alreadyAnimated}
                                       //passed instant scrolling function here
                                       onTyping={forceScrollToBottom}
                                    />
                                 ) : (
                                    // User messages render instantly
                                    message.content
                                 )}

                                 {/* REPLACED {message.content} WITH REACT MARKDOWN COMPONENT to render the bold, bullet points, list */}
                                 <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                       // Customize how different elements look to match your theme

                                       // Bold text
                                       strong: ({ node, ...props }) => (
                                          <span
                                             className="font-bold text-white"
                                             {...props}
                                          />
                                       ),

                                       // Links
                                       a: ({ node, ...props }) => (
                                          <a
                                             className="text-[#C9A24D] underline hover:text-[#D1D1D1]"
                                             target="_blank"
                                             rel="noopener noreferrer"
                                             {...props}
                                          />
                                       ),

                                       // Bullet Lists
                                       ul: ({ node, ...props }) => (
                                          <ul
                                             className="list-disc pl-4 mb-2 space-y-1"
                                             {...props}
                                          />
                                       ),

                                       // Numbered Lists
                                       ol: ({ node, ...props }) => (
                                          <ol
                                             className="list-decimal pl-4 mb-2 space-y-1"
                                             {...props}
                                          />
                                       ),

                                       // List Items
                                       li: ({ node, ...props }) => (
                                          <li className="pl-1" {...props} />
                                       ),

                                       // Headings (h1, h2, h3)
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

                                       // Paragraphs (adds spacing between blocks of text)
                                       p: ({ node, ...props }) => (
                                          <p
                                             className="mb-2 last:mb-0 leading-relaxed"
                                             {...props}
                                          />
                                       ),
                                    }}
                                 >
                                    {/* {message.content} */}
                                 </ReactMarkdown>
                              </div>
                           </motion.div>
                        ))}
                     </div>

                     {/* Input */}
                     <div className="p-4 sm:p-6 border-t border-[#C9A24D]/30">
                        <div className="flex gap-3">
                           <input
                              type="text"
                              value={input}
                              onChange={(e) => setInput(e.target.value)}
                              onKeyPress={(e) =>
                                 e.key === 'Enter' && handleSend()
                              }
                              placeholder="Type your question..."
                              className="flex-1 px-4 py-3 bg-[#0F0F0F] border border-[#C9A24D]/30 text-[#D1D1D1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A24D] placeholder-[#D1D1D1]/50 text-sm sm:text-base"
                           />
                           <button
                              onClick={handleSend}
                              className="px-4 sm:px-6 py-3 bg-[#C9A24D] text-[#0F0F0F] rounded-xl hover:shadow-lg hover:shadow-[#C9A24D]/30 transition-shadow flex items-center gap-2 font-semibold"
                           >
                              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                           </button>
                        </div>
                     </div>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
      </section>
   );
}
