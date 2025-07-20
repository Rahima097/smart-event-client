import { useEffect, useState } from 'react';
import API from './api';
import type { Event } from './types/Event';
import EventForm from './components/EventForm';
import EventCard from './components/EventCard';

function App() {
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    const res = await API.get('/events');
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="w-8/12 mx-auto p-4 ">
      <h1 className="text-3xl text-center font-bold mb-4">Smart Event Scheduler</h1>
      <EventForm onAdd={fetchEvents} />
      <div className="mt-6 space-y-4">
        {events.map((e) => (
          <EventCard key={e._id} event={e} onDelete={fetchEvents} />
        ))}
      </div>
    </div>
  );
}

export default App;