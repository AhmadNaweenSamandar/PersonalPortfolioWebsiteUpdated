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
   const [selectedItem, setSelectedItem] = useState<JourneyItem | null>(null);

   const journeyItems: JourneyItem[] = [];
   return (
      <section id="journey" className="py-12 sm:py-16 lg:py-20 bg-[#0F0F0F]">
         <div className="container mx-auto px-4 sm:px-6">
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

                  {/* Journey items positioned on the curve */}
                  {journeyItems.map((item, idx) => {
                     // Calculate positions along the curve
                     const positions = [
                        { x: 50, y: 250 },
                        { x: 250, y: 80 },
                        { x: 450, y: 180 },
                        { x: 650, y: 100 },
                        { x: 950, y: 120 },
                     ];

                     return (
                        <motion.div
                           key={idx}
                           initial={{ opacity: 0, scale: 0 }}
                           whileInView={{ opacity: 1, scale: 1 }}
                           viewport={{ once: true }}
                           transition={{ delay: idx * 0.2 }}
                           className="absolute"
                           style={{
                              left: `${(positions[idx].x / 1000) * 100}%`,
                              top: `${(positions[idx].y / 300) * 100}%`,
                              transform: 'translate(-50%, -50%)',
                           }}
                        >
                           <button
                              onClick={() => setSelectedItem(item)}
                              className="relative group"
                           >
                              {/* Glowing dot - smaller size */}
                              <motion.div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#C9A24D] shadow-lg cursor-pointer hover:scale-125 transition-transform relative">
                                 <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#0F0F0F] rounded-full" />
                                 </div>
                              </motion.div>

                              {/* Date and title label */}
                              <div className="absolute top-12 sm:top-14 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                                 <p className="font-bold text-xs sm:text-sm text-[#C9A24D] mb-1">
                                    {item.date}
                                 </p>
                                 <p className="text-xs text-[#D1D1D1]/70 group-hover:text-[#C9A24D] transition-colors">
                                    {item.title}
                                 </p>
                              </div>
                           </button>
                        </motion.div>
                     );
                  })}
               </div>
            </div>
         </div>
      </section>
   );
}
