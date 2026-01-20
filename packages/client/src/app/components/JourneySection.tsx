import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users } from 'lucide-react';

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

   const journeyItems: JourneyItem[] = [
      {
         date: 'Dec 2023',
         title: 'Newcomer to Canada',
         description:
            'Started my journey in Canada, learning the way of life and getting used to things around me. Get to my new home and started everything from scratch.',
         startDate: 'December 2023',
         endDate: 'Present',
         logo: '',
         teamPhoto: '',
      },
      {
         date: 'March 2024',
         title: 'Volunteer',
         description:
            'Joined Catholic Centre for Immigrants (CCI) as social work volunteer. Gain valuable experience in work ethics of Canada. Organized many events for newcomers and community members.',
         startDate: 'March 2024',
         endDate: 'June 2024',
         logo: './src/ProjectPhotos/ccilogo.jpg',
         teamPhoto: '',
      },
      {
         date: 'July 2024',
         title: 'Part-time Youth Worker',
         description:
            'Worked with youth programs to organize events and manage learning program for youths. Collaborated with partners to run literacy program. Coordinated tasks with theam and reported to manager.',
         startDate: 'July 2024',
         endDate: 'Jan 2026',
         logo: './src/ProjectPhotos/ccilogo.jpg',
         teamPhoto: '',
      },
      {
         date: 'Sep 2024',
         title: 'Admitted to University of Ottawa',
         description:
            'Enrolled in Bachelor of Applied Science in Software Engineering program at University of Ottawa, focusing on learning coding, algorithms, software engineering principles, and artificial intelligence.',
         startDate: 'September 2024',
         endDate: 'Present',
         logo: './src/ProjectPhotos/uottawalogo.png',
         teamPhoto: '',
      },
      {
         date: 'Jan 2026',
         title: 'Junior Software Developer Intern',
         description:
            'Contributed in developing tools and products for Faculty of Health Sciences at University of Ottawa in a four month Co-op term. Developed coding best practices and learnt collaboration in real-world projects.',
         startDate: 'Jan 2026',
         endDate: 'Present',
         logo: './src/ProjectPhotos/uottawalogo.png',
         teamPhoto: '',
      },
   ];
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
                        stroke=""
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

         {/* Popup Modal */}
         {/* AnimatePresence: specific to Framer Motion. 
            It allows the exit animations (defined in exit prop) to finish playing 
            before the component is actually removed from the DOM.
            */}
         <AnimatePresence>
            {/* Conditional Rendering: The modal only exists in the DOM if 'selectedItem' is truthy */}
            {selectedItem && (
               /* 1. BACKDROP / OVERLAY 
                  This outer div covers the entire screen and handles the dimming effect.
               */
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  // Fixed positioning covers the whole viewport. z-50 ensures it sits on top of everything.
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                  // UX Pattern: Clicking the dark background closes the modal
                  onClick={() => setSelectedItem(null)}
               >
                  {/* 2. MODAL CARD 
                     The actual content container.
                     */}
                  <motion.div
                     initial={{ scale: 0.9, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 0.9, opacity: 0 }}
                     // CRITICAL: Stop Propagation.
                     // Prevents the click on the card from bubbling up to the backdrop and closing the modal.
                     onClick={(e) => e.stopPropagation()}
                     className="bg-[#1A1A1A] rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden border border-[#C9A24D]/30"
                  >
                     <div>
                        {/* Close 'X' Button top-right */}
                        <button
                           onClick={() => setSelectedItem(null)}
                           className="absolute top-4 right-4 p-2 bg-[#0F0F0F]/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-[#0F0F0F] transition-colors"
                        >
                           <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#D1D1D1]" />
                        </button>
                     </div>

                     {/*journey container text info*/}
                     <div className="p-6 sm:p-8">
                        <div className="flex-1">
                           <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-[#D1D1D1]">
                              {selectedItem.title}
                           </h3>
                           <div className="flex items-center gap-4 text-[#D1D1D1]/70">
                              <div className="flex items-center gap-2">
                                 <Calendar className="w-4 h-4 text-[#C9A24D]" />
                                 <span className="text-xs sm:text-sm">
                                    {selectedItem.startDate} -{' '}
                                    {selectedItem.endDate}
                                 </span>
                              </div>
                           </div>
                        </div>

                        {/* Description Section */}
                        <div className="space-y-4">
                           <div>
                              <h4 className="font-bold text-lg mb-2 flex items-center gap-2 text-[#D1D1D1]">
                                 <Users className="w-5 h-5 text-[#C9A24D]" />
                                 Experience Description
                              </h4>
                              <p className="text-[#D1D1D1]/80 leading-relaxed text-sm sm:text-base">
                                 {selectedItem.description}
                              </p>
                           </div>
                           {/* Footer / Hardcoded Reflection */}
                           <div className="pt-4 border-t border-[#C9A24D]/30">
                              <p className="text-sm text-[#D1D1D1]/60">
                                 This experience has been instrumental in
                                 developing my skills and understanding of the
                                 tech industry.
                              </p>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
      </section>
   );
}
