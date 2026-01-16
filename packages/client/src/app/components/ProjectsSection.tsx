import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';

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
   const [projects, setProjects] = useState<Project[]>([]);

   const [flipped, setFlipped] = useState(false);
   //flipping logic
   //implemented using an array
   const nextProject = () => {
      //initially no card is flipped
      setFlipped(false);

      setProjects((prev) => {
         //store prev in newPorjects
         const newProjects = [...prev];
         //add the first card in first variable
         const first = newProjects.shift()!;
         //add the first card back to the end creating card loop transition
         newProjects.push(first);
         return newProjects;
      });
   };

   const currentProject = projects[0];
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

            <div className="max-w-4xl mx-auto relative">
               {/* Stacked cards on the right */}
               <div
                  className="relative"
                  style={{ perspective: '1500px', minHeight: '500px' }}
               >
                  {/* Background stacked cards */}
                  <div className="absolute right-0 top-0 hidden md:block">
                     {projects.slice(1, 4).map((project, idx) => {
                        const scale = 1 - (idx + 1) * 0.05;
                        const translateX = (idx + 1) * 15;
                        const translateY = (idx + 1) * 10;

                        return (
                           <motion.div
                              key={project.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 0.6 - idx * 0.15 }}
                              style={{
                                 position: 'absolute',
                                 right: 0,
                                 top: 0,
                                 transform: `scale(${scale}) translateX(${translateX}px) translateY(${translateY}px)`,
                                 zIndex: 3 - idx,
                              }}
                              className="w-64 h-80 bg-[#0F0F0F] rounded-2xl border border-[#C9A24D]/30 shadow-xl"
                           ></motion.div>
                        );
                     })}
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
