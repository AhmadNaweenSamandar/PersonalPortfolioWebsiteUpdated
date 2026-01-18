import {
   MapPin,
   Phone,
   Mail,
   Github,
   Linkedin,
   MessageSquare,
} from 'lucide-react';
import { motion } from 'motion/react';

export function ContactSection() {
   const contactInfo = [
      {
         icon: MapPin,
         title: 'Address',
         value: 'Ottawa, Canada',
         link: 'https://maps.google.comhttps://www.google.com/maps/search/Ottawa,%20Ontario,%20Canada',
      },
      {
         icon: Phone,
         title: 'Phone',
         value: '+1 (613) 462-2107',
         link: 'tel:+16134622107',
      },
      {
         icon: Mail,
         title: 'Email',
         value: 'naween603@gmail.com',
         link: 'mailto:naween603@@gmail.com',
      },
   ];

   const socialLinks = [
      {
         icon: Linkedin,
         name: 'LinkedIn',
         link: 'https://www.linkedin.com/in/ahmad-naween-samandar-17aaba275/',
      },
      {
         icon: Github,
         name: 'GitHub',
         link: 'https://github.com/AhmadNaweenSamandar',
      },
      {
         icon: MessageSquare,
         name: 'Discord',
         link: 'https://discord.com/ahmad_naw',
      },
   ];

   return (
      /* main contact container with background [#0F0F0F] */
      <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-[#0F0F0F]">
         <div className="container mx-auto px-4 sm:px-6">
            {/* header with specific opacity and styling */}
            <motion.h2
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16 text-[#D1D1D1]"
            >
               Get In Touch
            </motion.h2>

            {/* CONTACT CARDS CONTAINER
                - Mobile: flex-col (Stacked vertically)
                - Tablet/Desktop (sm+): flex-row (Side-by-side)
            */}
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12 sm:mb-16">
               {contactInfo.map((info, idx) => {
                  // Dynamic Component Pattern: Assigning the icon component to a capitalized variable
                  // allows us to render it as <Icon /> later.
                  const Icon = info.icon;
                  return (
                     <motion.a
                        key={info.title}
                        href={info.link}
                        target="_blank"
                        // SECURITY: rel="noopener noreferrer" is mandatory when using target="_blank"
                        // to prevent the new tab from hijacking the original page process.
                        rel="noopener noreferrer"
                        // STAGGERED ENTRANCE: Cards appear one by one (0.1s delay per index)
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        // HOVER STATE:
                        // 1. Lifts up (-10px)
                        // 2. Scales slightly (1.02)
                        // 3. Border color changes (via CSS classes below)
                        whileHover={{ y: -10, scale: 1.02 }}
                        className="flex-1 bg-[#1A1A1A] border border-[#C9A24D]/30 rounded-2xl p-6 sm:p-8 hover:shadow-md hover:shadow-[#C9A24D]/15 transition-all group hover:border-[#C9A24D]"
                     >
                        <div className="flex flex-col items-center text-center">
                           {/* ICON CIRCLE
                            - Group Hover: When the *card* is hovered, this specific *icon container* scales up (scale-110)
                            */}
                           <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#C9A24D] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                              <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#0F0F0F]" />
                           </div>
                           <h3 className="font-bold text-lg sm:text-xl mb-2 text-[#D1D1D1]">
                              {info.title}
                           </h3>
                           <p className="text-[#D1D1D1]/80 text-sm sm:text-base">
                              {info.value}
                           </p>
                        </div>
                     </motion.a>
                  );
               })}
            </div>
            {/* SOCIAL LINKS SECTION */}
            <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               className="text-center mb-8"
            >
               <h3 className="text-xl sm:text-2xl font-bold mb-6 text-[#D1D1D1]">
                  Stay Connected
               </h3>
               <div className="flex justify-center gap-4 sm:gap-6">
                  {socialLinks.map((social, idx) => {
                     const Icon = social.icon;
                     return (
                        <motion.a
                           key={social.name}
                           href={social.link}
                           target="_blank"
                           rel="noopener noreferrer"
                           // POP-IN ANIMATION: Starts size 0, grows to size 1
                           initial={{ opacity: 0, scale: 0 }}
                           whileInView={{ opacity: 1, scale: 1 }}
                           viewport={{ once: true }}
                           transition={{ delay: idx * 0.1 }}
                           // PLAYFUL HOVER:
                           // Rotates a full 360 degrees and grows significantly (1.2)
                           whileHover={{ scale: 1.2, rotate: 360 }}
                           className="w-14 h-14 sm:w-16 sm:h-16 bg-[#C9A24D] rounded-full flex items-center justify-center text-[#0F0F0F] hover:shadow-md hover:shadow-[#C9A24D]/20 transition-all"
                        >
                           <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                        </motion.a>
                     );
                  })}
               </div>
            </motion.div>
         </div>
      </section>
   );
}
