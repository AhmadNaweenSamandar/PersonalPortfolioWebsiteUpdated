import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, FileText, Diamond, Circle } from 'lucide-react';

export function HeroSection() {
   const [showButtons, setShowButtons] = useState(false);
   const [currentKeyword, setCurrentKeyword] = useState(0);

   //these three keywords will constantly appear under the name one by one showing three different information regarding me
   const keywords = [
      'Student at University of Ottawa',
      'Software Engineer',
      'Full Stack Developer',
   ];

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentKeyword((prev) => (prev + 1) % keywords.length);
      }, 3000);
      return () => clearInterval(interval);
   }, []);

   return (
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0F0F0F]">
         {/* Animated Background Elements */}
         {/* Diamond ease in and out animation */}
         <motion.div
            className="absolute top-10 sm:top-20 right-10 sm:right-20"
            animate={{
               rotate: [0, 360],
               y: [0, -20, 0],
            }}
            transition={{
               duration: 8,
               repeat: Infinity,
               ease: 'easeInOut',
            }}
         >
            <Diamond className="w-8 h-8 sm:w-12 lg:w-16 text-[#C9A24D] opacity-20" />
         </motion.div>

         {/* {circle moving animation} */}
         <motion.div
            className="absolute top-1/4 left-10 sm:left-20"
            animate={{
               scale: [1, 1.2, 1],
               opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
               duration: 4,
               repeat: Infinity,
               ease: 'easeInOut',
            }}
         >
            <Circle className="w-8 h-8 sm:w-12 text-[#C9A24D] fill-current opacity-30" />
         </motion.div>

         {/* Airplane Path Animation */}
         {/* {this has not been consistent with its correct appearence, potentially need a look back} */}
         {!showButtons && (
            <motion.div
               className="absolute hidden lg:block"
               style={{
                  left: '50%',
                  top: '50%',
                  marginLeft: '-200px',
                  marginTop: '-100px',
               }}
            >
               <svg width="400" height="300" viewBox="0 0 400 300">
                  <motion.path
                     d="M 20 20 Q 150 80 280 220"
                     fill="none"
                     stroke="#C9A24D"
                     strokeWidth="2"
                     strokeDasharray="8,4"
                     initial={{ pathLength: 0, opacity: 0.3 }}
                     animate={{ pathLength: 1, opacity: 0.6 }}
                     transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                     }}
                  />
                  {/* Animated dot following the path */}
                  <motion.circle
                     r="3"
                     fill="#C9A24D"
                     initial={{ offsetDistance: '0%' }}
                     animate={{ offsetDistance: '100%' }}
                     transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                     }}
                  >
                     <animateMotion
                        dur="3s"
                        repeatCount="indefinite"
                        path="M 20 20 Q 150 80 280 220"
                     />
                  </motion.circle>
               </svg>
            </motion.div>
         )}

         <div className="text-center z-10 px-4 sm:px-6">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
            >
               <p className="text-[#D1D1D1] mb-4 text-md md:text-base">
                  Welcome
               </p>
            </motion.div>

            <motion.h1
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold"
            >
               <span className="text-[#D1D1D1]">I'm</span>
               <br />
               <span
                  className="bg-gradient-to-r from-[#C9A24D] via-[#D4B56F] to-[#C9A24D] bg-clip-text text-transparent"
                  style={{ backgroundSize: '150% auto' }}
               >
                  Ahmad Naween Samandar
               </span>
            </motion.h1>

            <div className="h-12 sm:h-16 mb-8 sm:mb-12">
               <AnimatePresence mode="wait">
                  <motion.div
                     key={currentKeyword}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -20 }}
                     transition={{ duration: 0.5 }}
                     className="text-[#D1D1D1] text-lg sm:text-xl md:text-2xl font-medium"
                  >
                     {keywords[currentKeyword].split('').map((char, idx) => (
                        <motion.span
                           key={idx}
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ delay: idx * 0.03 }}
                        >
                           {char}
                        </motion.span>
                     ))}
                  </motion.div>
               </AnimatePresence>
            </div>
            {/* {when a user click on the learn more it will pop up three new button for social media} */}
            <AnimatePresence mode="wait">
               {!showButtons ? (
                  <motion.button
                     key="learn-more"
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.8 }}
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={() => setShowButtons(true)}
                     className="px-6 sm:px-8 py-3 sm:py-4 bg-[#C9A24D] text-[#0F0F0F] rounded-full hover:shadow-lg hover:shadow-[#C9A24D]/30 transition-shadow font-semibold text-sm sm:text-base"
                  >
                     Learn More
                  </motion.button>
               ) : (
                  <motion.div
                     key="social-buttons"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
                  >
                     <motion.a
                        href="https://github.com/AhmadNaweenSamandar"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#1A1A1A] text-[#D1D1D1] rounded-full hover:shadow-lg hover:shadow-[#C9A24D]/20 transition-shadow border border-[#C9A24D]/30 text-sm sm:text-base"
                     >
                        <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                        GitHub
                     </motion.a>

                     <motion.a
                        href="/resume.pdf"
                        download
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#C9A24D] text-[#0F0F0F] rounded-full hover:shadow-lg hover:shadow-[#C9A24D]/30 transition-shadow font-semibold text-sm sm:text-base"
                     >
                        <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                        Resume
                     </motion.a>

                     <motion.a
                        href="https://www.linkedin.com/in/ahmad-naween-samandar-17aaba275/"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#1A1A1A] text-[#D1D1D1] rounded-full hover:shadow-lg hover:shadow-[#C9A24D]/20 transition-shadow border border-[#C9A24D]/30 text-sm sm:text-base"
                     >
                        <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                        LinkedIn
                     </motion.a>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </section>
   );
}
