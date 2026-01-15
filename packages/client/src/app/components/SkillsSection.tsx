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

    )
}