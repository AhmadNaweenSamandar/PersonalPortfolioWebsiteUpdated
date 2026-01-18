import { useState } from 'react';

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
}
