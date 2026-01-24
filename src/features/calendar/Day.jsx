import { useDispatch } from 'react-redux';
import { addEvent } from './calendarSlice';
import './Day.css';

export function Day({ date, dateData }) {
  const dispatch = useDispatch();

  const gregorianDate = new Date(date + 'T00:00:00');
  const dayOfMonth = gregorianDate.getDate();
  const hebrewDate = dateData?.hebrew || date;
  const events = Array.isArray(dateData?.events) ? dateData.events : [];

  const handleShowEvents = () => {
    if (events.length > 0) {
      alert(`Events on ${hebrewDate}:\n${events.join('\n')}`);
    }
  };

  const handleAddEvent = () => {
    const eventName = prompt('Enter event name:');
    if (eventName) {
      dispatch(addEvent({ date, eventName }));
    }
  };

  return (
    <div className="day-cell">
      <div className="day-number">{dayOfMonth}</div>
      <div className="hebrew-date">{hebrewDate}</div>
      <div className="event-count" onClick={handleShowEvents}>
        {events.length > 0 && (
          <span className="event-link">{events.length} events</span>
        )}
      </div>
      <button className="add-event-btn" onClick={handleAddEvent}>
        Add Event
      </button>
    </div>
  );
}
