import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Calendar } from '../calendar/Calendar';
import { CalendarRedirect } from '../calendar/CalendarRedirect';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>Hebrew Calendar</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<CalendarRedirect />} />
            <Route path="/calendar/:month/:year" element={<Calendar />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
