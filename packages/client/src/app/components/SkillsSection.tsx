import { motion } from "motion/react";
import { Code, Server, Database, GitBranch, Brain } from "lucide-react";

export function SkillsSection() {

    return(
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
                                    <h3 className="font-bold text-lg text-[#D1D1D1]">{category.title}</h3>
                                </div>


    )
}