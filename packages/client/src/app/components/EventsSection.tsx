import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

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
         image: '/ProjectPhotos/teamlaunch.jpg',
         description: 'Cricket team introduction and youth appreciation event.',
         photos: [
            {
               id: 1,
               url: '/ProjectPhotos/teamintro1.JPG',
               caption: 'Presentation',
            },
            {
               id: 2,
               url: '/ProjectPhotos/teamintro2.JPG',
               caption: 'Team announcement',
            },
            {
               id: 3,
               url: '/ProjectPhotos/teamintro3.jpg',
               caption: 'Speech',
            },
            // {
            //    id: 4,
            //    url: '/ProjectPhotos/teamintro4.jpg',
            //    caption: 'Team introduction',
            // },
            {
               id: 5,
               url: '/ProjectPhotos/teamintro5.jpg',
               caption: 'Group Photo',
            },
            { id: 6, url: '/ProjectPhotos/teamintro6.jpg', caption: 'Wrapup' },
         ],
      },

      {
         id: 2,
         title: 'Workshop regarding Artificial Intelligence',
         date: 'August 2025',
         image: '/ProjectPhotos/aiworkshop.PNG',
         description:
            'Hands on workshop about Large-Language-Models, how to use ChatGPT and Gemini along side learning opportunities in AI discussed.',
         photos: [
            {
               id: 1,
               url: '/ProjectPhotos/aiworkshop1.jpg',
               caption: 'Intro',
            },
            {
               id: 2,
               url: '/ProjectPhotos/aiworkshop2.jpg',
               caption: 'Presentation',
            },
            {
               id: 3,
               url: '/ProjectPhotos/aiworkshop3.jpg',
               caption: 'Team Picture',
            },
            {
               id: 4,
               url: '/ProjectPhotos/aiworkshop4.jpg',
               caption: 'Group Picture',
            },
            // { id: 5, url: '', caption: '' },
            // { id: 6, url: '', caption: '' },
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

            {/* EVENT CARDS GRID */}
            <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-6 sm:gap-8">
               {events.map((event, idx) => (
                  <motion.div
                     key={event.id}
                     // STAGGERED ENTRANCE: Uses the index (idx) to delay each card slightly (0.2s * index)
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: idx * 0.2 }}
                     // HOVER INTERACTION: Card lifts up slightly (-10px) on hover
                     whileHover={{ y: -10 }}
                     // LOGIC: Opens the first modal (Gallery)
                     onClick={() => setSelectedEvent(event)}
                     // STYLING:
                     // 'group': Allows child elements (like the image) to react when the parent is hovered.
                     // 'cursor-pointer': Indicates interactivity.
                     className="group relative bg-[#0F0F0F] rounded-3xl overflow-hidden shadow-xl hover:shadow-md hover:shadow-[#C9A24D]/15 transition-all cursor-pointer border border-[#C9A24D]/30"
                  >
                     <div className="relative h-64 sm:h-80 lg:h-96">
                        {/*Event poster*/}
                        <img
                           src={event.image}
                           alt={event.title}
                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* GRADIENT OVERLAY: Ensures text readability by darkening the bottom of the image */}

                        {/* Event info */}
                        {/* CARD CONTENT */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                           <div className="flex items-center gap-2 mb-2">
                              {/* Date Badge */}
                              <span className="px-3 py-1 bg-[#C9A24D] text-[#0F0F0F] rounded-full text-xs sm:text-sm font-medium">
                                 {event.date}
                              </span>
                           </div>
                           {/* <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-[#000000]">
                              {event.title}
                           </h3> */}
                           {/* <p className="text-[#D1D1D1]/80 text-sm sm:text-base">
                              {event.description}
                           </p> */}
                        </div>
                     </div>

                     {/* "CLICK TO VIEW" BADGE
                            Initially invisible (opacity: 0), only appears when user hovers the card.
                        */}
                     <motion.div
                        className="absolute top-4 right-4 px-3 py-1 bg-[#C9A24D] text-[#0F0F0F] rounded-full text-xs font-medium"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                     >
                        Click to view gallery
                     </motion.div>
                  </motion.div>
               ))}
            </div>
         </div>

         {/* ========================================================
        MODAL 1: EVENT GALLERY POPUP
        Conditionally rendered if an event is selected AND no specific photo is selected yet.
       ======================================================== */}
         <AnimatePresence>
            {selectedEvent && !selectedPhoto && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  // BACKDROP: Fixed to cover viewport, z-50 to sit above content
                  className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                  // LOGIC: Clicking the dark background closes the modal
                  onClick={() => setSelectedEvent(null)}
               >
                  <motion.div
                     initial={{ scale: 0.9, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 0.9, opacity: 0 }}
                     // LOGIC: Prevents clicks inside the modal from closing it
                     onClick={(e) => e.stopPropagation()}
                     className="bg-[#1A1A1A] rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden border border-[#C9A24D]/30"
                  >
                     {/* Header Modal */}
                     <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#C9A24D]/30">
                        <div>
                           <h3 className="font-bold text-xl sm:text-2xl text-[#D1D1D1]">
                              {selectedEvent.title}
                           </h3>
                           <p className="text-sm text-[#D1D1D1]/70">
                              {selectedEvent.date}
                           </p>
                        </div>
                        <button
                           onClick={() => setSelectedEvent(null)}
                           className="p-2 hover:bg-[#C9A24D]/20 rounded-full transition-colors"
                        >
                           <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#D1D1D1]" />
                        </button>
                     </div>

                     {/* PHOTO GRID CONTAINER
                    max-h-[calc(90vh-100px)] ensures the grid scrolls internally if content is too tall
                */}
                     <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                           {selectedEvent.photos.map((photo) => (
                              <motion.div
                                 key={photo.id}
                                 whileHover={{ scale: 1.05 }}
                                 // LOGIC: Opens the second modal (Full Photo View)
                                 onClick={() => setSelectedPhoto(photo)}
                                 className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group border border-[#C9A24D]/30 hover:border-[#C9A24D] transition-all"
                              >
                                 {/*Gallery photo*/}
                                 <img
                                    src={photo.url}
                                    alt={photo.caption}
                                    className="w-full h-full object-cover"
                                 />
                                 {/* PHOTO CAPTION OVERLAY: Appears on hover */}
                                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-end p-3">
                                    <p className="text-white text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                       {photo.caption}
                                    </p>
                                 </div>
                              </motion.div>
                           ))}
                        </div>
                     </div>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>

         {/* ========================================================
        MODAL 2: FULL SCREEN PHOTO LIGHTBOX
        Rendered when a specific photo is clicked.
       ======================================================== */}
         <AnimatePresence>
            {selectedPhoto && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  // STYLING: z-[60] ensures this sits ON TOP of the previous modal (z-50) if both were open
                  // bg-black/95 creates a darker, more immersive focus mode
                  className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
                  onClick={() => setSelectedPhoto(null)}
               >
                  <motion.div
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 0.8, opacity: 0 }}
                     className="relative max-w-5xl max-h-[90vh]"
                     //ensures the picture stays on if user click on the screen
                     onClick={(e) => e.stopPropagation()}
                  >
                     {/* FLOATING CLOSE BUTTON */}
                     <button
                        onClick={() => setSelectedPhoto(null)}
                        className="absolute -top-12 right-0 p-2 bg-[#C9A24D] rounded-full shadow-lg hover:bg-[#C9A24D]/80 transition-colors z-10"
                     >
                        <X className="w-6 h-6 text-[#0F0F0F]" />
                     </button>
                     {/*individual image preview*/}
                     <img
                        src={selectedPhoto.url}
                        alt={selectedPhoto.caption}
                        className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl border border-[#C9A24D]/50"
                     />

                     {/* CAPTION BAR */}
                     <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                        <p className="text-white text-center font-medium">
                           {selectedPhoto.caption}
                        </p>
                     </div>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
      </section>
   );
}
