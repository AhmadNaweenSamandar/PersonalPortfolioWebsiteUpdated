import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface NavbarProps {
   activeSection: string;
}

export function Navbar({ activeSection }: NavbarProps) {
   //navbar stick to the top while scrolling
   const [scrolled, setScrolled] = useState(false);

   useEffect(() => {
      const handleScroll = () => {
         setScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   //four section attached to the navbar
   const navLinks = [
      { id: 'projects', label: 'Projects' },
      { id: 'journey', label: 'Journey' },
      { id: 'events', label: 'Events' },
      { id: 'contact', label: 'Contact' },
   ];

   //any link click in the navbar will be visited smoothly
   const scrollToSection = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
         element.scrollIntoView({ behavior: 'smooth' });
      }
   };
   return (
      <motion.nav
         initial={{ y: -100 }}
         animate={{ y: 0 }}
         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled
               ? 'bg-[#0F0F0F]/95 backdrop-blur-lg shadow-md'
               : 'bg-transparent'
         }`}
      >
         <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
               <span className="font-black tracking-tight text-[#C9A24D] text-2xl sm:text-3xl lg:text-4xl">
                  ANS
               </span>
            </div>

            <div className="flex gap-4 sm:gap-6 lg:gap-8">
               {navLinks.map((link) => (
                  <button
                     key={link.id}
                     onClick={() => scrollToSection(link.id)}
                     className="relative group"
                  >
                     <span
                        className={`transition-colors text-sm sm:text-base ${
                           activeSection === link.id
                              ? 'text-[#C9A24D]'
                              : 'text-[#D1D1D1] hover:text-[#C9A24D]'
                        }`}
                     >
                        {link.label}
                     </span>
                     {activeSection === link.id && (
                        <motion.div
                           layoutId="activeSection"
                           className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C9A24D]"
                           transition={{
                              type: 'spring',
                              stiffness: 380,
                              damping: 30,
                           }}
                        />
                     )}
                  </button>
               ))}
            </div>
         </div>
      </motion.nav>
   );
}
