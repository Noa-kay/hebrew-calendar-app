import { useDispatch } from 'react-redux';
import { addEvent } from './calendarSlice';
import './Day.css';

export function Day({ date, dateData, isCurrentMonth = true }) {
  const dispatch = useDispatch();

  const gregorianDate = new Date(date);
  const dayOfMonth = gregorianDate.getDate();
  const hebrewDate = dateData?.hebrew || '';
  const events = Array.isArray(dateData?.events) ? dateData.events : [];

  const handleShowEvents = () => {
    if (events.length > 0) {
      alert(`Events on ${date}:\n${events.join('\n')}`);
    }
  };

  const handleAddEvent = () => {
    const eventName = prompt('Enter event name:');
    if (eventName && eventName.trim()) {
      dispatch(addEvent({ date, eventName: eventName.trim() }));
    }
  };

  return (
    <div className={`day-cell ${!isCurrentMonth ? 'other-month' : ''}`}>
      <div className="day-number">{dayOfMonth}</div>
      {hebrewDate && <div className="hebrew-date">{hebrewDate}</div>}
      <div className="event-count" onClick={handleShowEvents}>
        {events.length > 0 && (
          <span className="event-link">{events.length} event{events.length > 1 ? 's' : ''}</span>
        )}
      </div>
      <button className="add-event-btn" onClick={handleAddEvent}>
        +
      </button>
    </div>
  );
}
