import { Calendar } from '../calendar/Calendar';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Hebrew Calendar</h1>
      </header>
      <main>
        <Calendar />
      </main>
    </div>
  );
}

export default App;
