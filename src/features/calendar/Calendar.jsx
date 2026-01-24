import { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCalendarData } from './calendarSlice';
import { Day } from './Day';
import './Calendar.css';

export function Calendar() {
  const { month, year } = useParams();
  const dispatch = useDispatch();
  const { dates, loading, error } = useSelector((state) => state.calendar);
  const [displayDates, setDisplayDates] = useState([]);

  const monthNum = parseInt(month);
  const yearNum = parseInt(year);

  // Fetch calendar data when month/year changes
  useEffect(() => {
    if (monthNum && yearNum) {
      dispatch(fetchCalendarData({ month: monthNum, year: yearNum }));
    }
  }, [dispatch, monthNum, yearNum]);

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
  const monthDate = new Date(yearNum, monthNum - 1);
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
