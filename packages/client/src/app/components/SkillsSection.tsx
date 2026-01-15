import { motion } from 'motion/react';
import { Code, Server, Database, GitBranch, Brain } from 'lucide-react';

export function SkillsSection() {
   const skillCategories = [
      {
         title: 'Frontend',
         icon: Code,
         skills: [
            {
               name: 'HTML',
               logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
            },
            {
               name: 'CSS',
               logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
            },
            {
               name: 'JavaScript',
               logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
            },
            {
               name: 'Figma',
               logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
            },
            {
               name: 'React',
               logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
            },
            {
               name: 'NPM',
               logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg',
            },
         ],
      },
   ];
   return (
      <section id="skills" className="py-12 sm:py-16 lg:py-20 bg-[#0F0F0F]">
         <div className="container mx-auto px-4 sm:px-6">
            <motion.h2
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16 text-[#D1D1D1]"
            >
               Skills & Expertise
            </motion.h2>

            {/* Horizontal Scrollable Container for Mobile/Tablet */}
            <div className="overflow-x-auto pb-4">
               <div className="flex gap-4 sm:gap-6 min-w-max lg:min-w-0 lg:grid lg:grid-cols-5 lg:gap-6">
                  {skillCategories.map((category, idx) => {
                     const Icon = category.icon;
                     return (
                        <motion.div
                           key={category.title}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: idx * 0.1 }}
                           className="flex-shrink-0 w-64 sm:w-72 lg:w-auto"
                        >
                           {/* Category Header */}
                           <div className="bg-[#1A1A1A] border border-[#C9A24D]/30 rounded-2xl p-4 sm:p-6 text-center mb-4">
                              <Icon className="w-8 h-8 mx-auto mb-3 text-[#C9A24D]" />
                              <h3 className="font-bold text-lg text-[#D1D1D1]">
                                 {category.title}
                              </h3>
                           </div>

                           {/* Skills under category */}
                           <div className="space-y-3">
                              {category.skills.map((skill, skillIdx) => (
                                 <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                       delay: idx * 0.1 + skillIdx * 0.05,
                                    }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="bg-[#1A1A1A] border-2 border-[#C9A24D]/30 rounded-xl p-3 sm:p-4 hover:border-[#C9A24D] transition-all cursor-pointer"
                                 >
                                    <div className="flex items-center gap-3">
                                       <img
                                          src={skill.logo}
                                          alt={skill.name}
                                          className="w-8 h-8 object-contain"
                                          style={{
                                             filter:
                                                skill.name === 'Express' ||
                                                skill.name === 'GitHub Action'
                                                   ? 'invert(1)'
                                                   : 'none',
                                          }}
                                       />
                                       <span className="font-medium text-sm text-[#D1D1D1]">
                                          {skill.name}
                                       </span>
                                    </div>
                                 </motion.div>
                              ))}
                           </div>
                        </motion.div>
                     );
                  })}
               </div>
            </div>

            {/* Scroll hint for mobile */}
            <div className="lg:hidden text-center mt-6">
               <p className="text-xs text-[#D1D1D1]/60">
                  ← Scroll horizontally to view all categories →
               </p>
            </div>
         </div>
      </section>
   );
}
