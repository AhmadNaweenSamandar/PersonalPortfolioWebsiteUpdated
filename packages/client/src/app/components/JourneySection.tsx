import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface JourneyItem {
   date: string;
   title: string;
   description: string;
   startDate: string;
   endDate: string;
   logo: string;
   teamPhoto: string;
}

export function JourneySection() {
   return (
      <section id="journey" className="py-12 sm:py-16 lg:py-20 bg-[#0F0F0F]">
         <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16 text-[#D1D1D1]"
         >
            My Journey
         </motion.h2>

         <div className="max-w-6xl mx-auto relative px-4">
            {/* Curved path SVG */}
            <div className="relative" style={{ height: '300px' }}>
               <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 1000 300"
                  preserveAspectRatio="xMidYMid meet"
               >
                  <motion.path
                     d="M 50,250 Q 250,80 450,180 T 950,120"
                     stroke="#C9A24D"
                     strokeWidth="3"
                     fill="none"
                     strokeDasharray="8,4"
                     initial={{ pathLength: 0, opacity: 0 }}
                     whileInView={{ pathLength: 1, opacity: 1 }}
                     viewport={{ once: true }}
                     transition={{ duration: 2, ease: 'easeInOut' }}
                  />
               </svg>
            </div>
         </div>
      </section>
   );
}
