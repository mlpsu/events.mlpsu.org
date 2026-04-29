'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface EventsData {
  events: string[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeInScale = {
  initial: { opacity: 0, scale: 0.95, y: 30 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function EventsPage() {
  const [events, setEvents] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/events.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: EventsData) => {
        setEvents(data.events || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading events:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600"
        >
          Loading events...
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-600"
        >
          Error loading events: {error}
        </motion.div>
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-600"
        >
          No events found.
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-[#FAF9F5] py-5 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.header 
          className="text-center mb-12 pt-16"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8" 
            style={{ fontFamily: 'Recoleta, serif' }}
            variants={fadeInUp}
          >
            Upcoming Events
          </motion.h1>
          <motion.a 
            href="https://mlpsu.org" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-sm border border-amber-200 rounded-full text-amber-800 hover:bg-amber-50 hover:border-amber-300 transition-all duration-200 text-lg font-medium shadow-sm hover:shadow-md"
            variants={fadeInUp}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>←</span>
            <span>go back to home</span>
          </motion.a>
        </motion.header>
        
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {events.map((eventId, index) => (
            <motion.div 
              key={eventId} 
              className="mb-8 flex justify-center"
              variants={fadeInScale}
              transition={{ delay: index * 0.1 }}
            >
              <iframe
                src={`https://luma.com/embed/event/${eventId}/simple`}
                width="600"
                height="450"
                className="w-full max-w-[600px] border-0"
                style={{
                  border: '1px solid #bfcbda88',
                  borderRadius: '4px',
                  aspectRatio: '600 / 450'
                }}
                allow="fullscreen; payment"
                aria-hidden="false"
                tabIndex={0}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
