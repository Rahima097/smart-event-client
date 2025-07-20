import type { Event } from '../types/Event';
import API from '../api';

interface Props {
  event: Event;
  onDelete: () => void;
}

const EventCard: React.FC<Props> = ({ event, onDelete }) => {
  const handleDelete = async () => {
    await API.delete(`/events/${event._id}`);
    onDelete();
  };

  return (
    <div className="border p-4 rounded shadow space-y-1">
      <h3 className="text-lg font-semibold">{event.title}</h3>
      <p>{event.date} at {event.time}</p>
      {event.notes && <p className="text-sm text-gray-600">Notes: {event.notes}</p>}
      <p className="text-sm italic">Category: {event.category}</p>
      <button onClick={handleDelete} className="text-red-600 hover:underline mt-2">Delete</button>
    </div>
  );
};

export default EventCard;