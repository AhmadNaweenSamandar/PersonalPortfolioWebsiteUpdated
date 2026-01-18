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

export function EventsSection() {}
