import { useState } from 'react';
import { motion } from 'motion/react';

//event photos interface
interface EventPhoto {
   id: number;
   url: string;
   caption: string;
}

//event poster interface
interface Event {
   id: number;
   title: string;
   date: string;
   image: string;
   description: string;
   photos: EventPhoto[];
}

export function EventsSection() {
   const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
   const [selectedPhoto, setSelectedPhoto] = useState<EventPhoto | null>(null);

   const events: Event[] = [
      {
         id: 1,
         title: 'Zwanan Team Introduction',
         date: 'Jun 2025',
         image: '',
         description: 'Cricket team introduction and youth appreciation event.',
         photos: [
            { id: 1, url: '', caption: 'Opening Ceremony' },
            { id: 2, url: '', caption: 'Speaker' },
            { id: 3, url: '', caption: 'Presentation' },
            { id: 4, url: '', caption: 'Team introduction' },
            { id: 5, url: '', caption: 'Networking' },
            { id: 6, url: '', caption: 'Snacks' },
         ],
      },

      {
         id: 2,
         title: 'Workshop regarding Artificial Intelligence',
         date: 'August 2025',
         image: '',
         description:
            'Hands on workshop about Large-Language-Models, how to use ChatGPT and Gemini along side learning opportunities in AI discussed.',
         photos: [
            { id: 1, url: '', caption: 'Team Working' },
            { id: 2, url: '', caption: 'Presentation' },
            { id: 3, url: '', caption: 'Team picture' },
            { id: 4, url: '', caption: 'Networking' },
            { id: 5, url: '', caption: '' },
            { id: 6, url: '', caption: '' },
         ],
      },
   ];

   return (
      //events section main container
      <section id="events" className="py-12 sm:py-16 lg:py-20 bg-[#1A1A1A]">
         {/*main event container with low opacity*/}
         <div className="container mx-auto px-4 sm:px-6">
            {/*motion library implemented for special aniation*/}
            <motion.h2
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16 text-[#D1D1D1]"
            >
               Events & Conferences
            </motion.h2>
         </div>
      </section>
   );
}
