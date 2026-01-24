import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function CalendarRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    navigate(`/calendar/${month}/${year}`);
  }, [navigate]);

  return null;
}
