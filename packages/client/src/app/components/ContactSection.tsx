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
         </div>
      </section>
   );
}
