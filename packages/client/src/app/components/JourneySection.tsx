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
      </section>
   );
}
