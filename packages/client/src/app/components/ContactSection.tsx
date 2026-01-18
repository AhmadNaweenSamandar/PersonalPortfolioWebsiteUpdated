import {
   MapPin,
   Phone,
   Mail,
   Github,
   Linkedin,
   MessageSquare,
} from 'lucide-react';

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
}
