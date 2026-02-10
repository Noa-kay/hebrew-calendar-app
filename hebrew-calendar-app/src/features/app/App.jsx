import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Calendar } from '../calendar/Calendar';
import { CalendarRedirect } from './CalendarRedirect';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="app-header">
          <h1>Hebrew Calendar</h1>
        </header>
        <main>
          <Routes>
            <Route path="/calendar/:month/:year" element={<Calendar />} />
            <Route path="*" element={<CalendarRedirect />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
