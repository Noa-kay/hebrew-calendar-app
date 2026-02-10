import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCalendarData } from './calendarSlice';
import { Day } from './Day';
import './Calendar.css';

export function Calendar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { month: monthParam, year: yearParam } = useParams();
  const { dates, loading, error } = useSelector((state) => state.calendar);
  const [displayDates, setDisplayDates] = useState([]);

  // Get current month and year from URL params or use current date
  const month = monthParam ? parseInt(monthParam) : new Date().getMonth() + 1;
  const year = yearParam ? parseInt(yearParam) : new Date().getFullYear();

  // Fetch calendar data on component mount or when month/year changes
  useEffect(() => {
    dispatch(fetchCalendarData({ month, year }));
  }, [dispatch, month, year]);

  // Update display with proper week alignment
  useLayoutEffect(() => {
    if (Object.keys(dates).length > 0) {
      const sortedDates = Object.keys(dates).sort();
      const firstDateStr = sortedDates[0];
      const firstDate = new Date(firstDateStr);
      const dayOfWeek = firstDate.getDay(); // 0 = Sunday, 6 = Saturday

      const newDisplayDates = [];

      // Add days from previous month
      for (let i = dayOfWeek - 1; i >= 0; i--) {
        const prevDate = new Date(firstDate);
        prevDate.setDate(prevDate.getDate() - (i + 1));
        newDisplayDates.push({
          date: prevDate.toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }),
          isCurrentMonth: false
        });
      }

      // Add days from current month
      sortedDates.forEach((date) => {
        newDisplayDates.push({
          date,
          isCurrentMonth: true
        });
      });

      // Add days from next month to complete last week
      const lastDateStr = sortedDates[sortedDates.length - 1];
      const lastDate = new Date(lastDateStr);
      const lastDayOfWeek = lastDate.getDay();
      const daysNeeded = 6 - lastDayOfWeek;

      for (let i = 1; i <= daysNeeded; i++) {
        const nextDate = new Date(lastDate);
        nextDate.setDate(nextDate.getDate() + i);
        newDisplayDates.push({
          date: nextDate.toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }),
          isCurrentMonth: false
        });
      }

      setDisplayDates(newDisplayDates);
    }
  }, [dates]);

  if (loading) return <div className="calendar-container">Loading calendar...</div>;
  if (error) return <div className="calendar-container">Error: {error}</div>;

  // Get month name from first date in dates
  const firstDateKey = Object.keys(dates)[0];
  let monthName = '';
  if (firstDateKey) {
    const monthDate = new Date(firstDateKey);
    monthName = monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

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
        {displayDates.map((item, index) => (
          <Day
            key={index}
            date={item.date}
            dateData={dates[item.date] || { hebrew: '', events: [] }}
            isCurrentMonth={item.isCurrentMonth}
          />
        ))}
      </div>
    </div>
  );
}
