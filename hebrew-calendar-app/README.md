# Hebrew Calendar App

A React-based Hebrew calendar application with Redux state management and React Router integration.

## Features

- 📅 Display Hebrew calendar with Gregorian dates
- 🔄 Fetch calendar data from Hebcal API
- ➕ Add custom events to any date
- 🔍 View events by clicking on event count
- 🌐 Router support for navigating between months
- 📱 Responsive grid layout

## Technologies Used

- **React** - UI library
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **Vite** - Build tool and dev server

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## Build

```bash
npm run build
```

## Usage

### Viewing the Calendar
- Each day shows Gregorian day number, Hebrew date, and event count
- Days from previous/next month are shown in lighter color

### Adding Events
1. Click the + button on any day
2. Enter event name in the prompt
3. Event is saved to Redux state

### Viewing Events
- Click on the event count to see all events for that day

### Navigation
- URL format: /calendar/:month/:year
- Example: /calendar/1/2026 shows January 2026

## API

Uses Hebcal API to fetch Hebrew calendar data

## Author

Created as part of React + Redux training exercise
