import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Project {
   id: number;
   title: string;
   description: string;
   image: string;
   tools: string[];
   demoLink: string;
   githubLink: string;
   detailedDescription: string;
}

export function ProjectsSection() {
   return (
      <section id="projects" className="py-12 sm:py-16 lg:py-20 bg-[#1A1A1A]">
         <div className="container mx-auto px-4 sm:px-6">
            <motion.h2
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16 text-[#D1D1D1]"
            >
               Featured Projects
            </motion.h2>
         </div>
      </section>
   );
}
