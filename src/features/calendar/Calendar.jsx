import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCalendarData } from './calendarSlice';
import { Day } from './Day';
import './Calendar.css';

export function Calendar() {
  const dispatch = useDispatch();
  const { dates, loading, error } = useSelector((state) => state.calendar);
  const [displayDates, setDisplayDates] = useState([]);

  // Get current month and year
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  // Fetch calendar data on component mount
  useEffect(() => {
    dispatch(fetchCalendarData({ month: currentMonth, year: currentYear }));
  }, [dispatch, currentMonth, currentYear]);

  // Update display with proper week alignment
  useLayoutEffect(() => {
    if (Object.keys(dates).length > 0) {
      const dateKeys = Object.keys(dates).sort();
      const firstDateStr = dateKeys[0];
      const firstDate = new Date(firstDateStr + 'T00:00:00');
      const dayOfWeek = firstDate.getDay(); // 0 = Sunday, 6 = Saturday

      const newDisplayDates = [];

      // Add days from previous month
      for (let i = dayOfWeek - 1; i >= 0; i--) {
        const prevDate = new Date(firstDate);
        prevDate.setDate(prevDate.getDate() - (i + 1));
        newDisplayDates.push(prevDate.toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }));
      }

      // Add days from current month
      dateKeys.forEach((date) => {
        newDisplayDates.push(date);
      });

      // Add days from next month to complete last week
      const lastDateStr = dateKeys[dateKeys.length - 1];
      const lastDate = new Date(lastDateStr + 'T00:00:00');
      const lastDayOfWeek = lastDate.getDay();
      const daysNeeded = 6 - lastDayOfWeek;

      for (let i = 1; i <= daysNeeded; i++) {
        const nextDate = new Date(lastDate);
        nextDate.setDate(nextDate.getDate() + i);
        newDisplayDates.push(nextDate.toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }));
      }

      setDisplayDates(newDisplayDates);
    }
  }, [dates]);

  if (loading) return <div className="calendar-container">Loading calendar...</div>;
  if (error) return <div className="calendar-container">Error: {error}</div>;

  // Get month name
  const monthDate = new Date(currentYear, currentMonth - 1);
  const monthName = monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="calendar-container">
      <h2>{monthName}</h2>
      <div className="calendar-grid">
        {/* Day headers */}
        <div className="day-header">Sunday</div>
        <div className="day-header">Monday</div>
        <div className="day-header">Tuesday</div>
        <div className="day-header">Wednesday</div>
        <div className="day-header">Thursday</div>
        <div className="day-header">Friday</div>
        <div className="day-header">Saturday</div>

        {/* Calendar days */}
        {displayDates.map((date, index) => (
          <Day
            key={index}
            date={date}
            dateData={dates[date] || { hebrew: date, events: [] }}
          />
        ))}
      </div>
    </div>
  );
}
