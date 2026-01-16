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

                  {/* Main Project Card */}
                  <AnimatePresence mode="wait">
                     <motion.div
                        key={`${currentProject.id}-${flipped}`}
                        initial={{ rotateY: 90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        exit={{ rotateY: -90, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ transformStyle: 'preserve-3d' }}
                        className="relative z-10 bg-[#0F0F0F] rounded-2xl shadow-2xl overflow-hidden border border-[#C9A24D]/50 max-w-md mx-auto md:mx-0"
                     >
                        {!flipped ? (
                            //project card front
                            <div>
                                <div className="p-6">
                                  <div className="flex flex-wrap gap-2 mb-4">
                                    {currentProject.tools.map((tool) => (
                                      <span
                                        key={tool}
                                        className="px-3 py-1 bg-[#C9A24D]/20 text-[#C9A24D] border border-[#C9A24D]/50 rounded-full text-xs font-medium"
                                      >
                                        {tool}
                                      </span>
                                    ))}
                                  </div>
                                  <h3 className="text-2xl font-bold mb-3 text-[#D1D1D1]">{currentProject.title}</h3>
                                  <p className="text-[#D1D1D1]/80 mb-6 text-sm sm:text-base">{currentProject.description}</p>
                                  <button
                                    onClick={() => setFlipped(true)}
                                    className="w-full py-3 bg-[#C9A24D] text-[#0F0F0F] rounded-xl hover:shadow-md hover:shadow-[#C9A24D]/20 transition-shadow font-semibold"
                                  >
                                    View Details
                                  </button>
                                </div>
                            </div>
                        ) : (

                        )}
                     </motion.div>
                  </AnimatePresence>
               </div>
            </div>
         </div>
      </section>
   );
}
