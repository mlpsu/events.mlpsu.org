'use client';

import { useEffect, useState } from 'react';

interface EventsData {
  events: string[];
}

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
        <div className="text-gray-600">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
        <div className="text-gray-600">Error loading events: {error}</div>
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
        <div className="text-gray-600">No events found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F5] py-5 px-4">
      <div className="max-w-6xl mx-auto">
        {events.map((eventId, index) => (
          <div key={eventId} className="mb-8 flex justify-center">
            <iframe
              src={`https://luma.com/embed/event/${eventId}/simple`}
              width="600"
              height="450"
              className="w-full max-w-[600px] h-auto aspect-[4/3]"
              style={{
                border: '1px solid #bfcbda88',
                borderRadius: '4px'
              }}
              allow="fullscreen; payment"
              aria-hidden="false"
              tabIndex={0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
