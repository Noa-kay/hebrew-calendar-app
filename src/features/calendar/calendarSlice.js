import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  dates: {},
  loading: false,
  error: null,
};

// Async thunk for fetching calendar data
export const fetchCalendarData = createAsyncThunk(
  'calendar/fetchCalendarData',
  async ({ month, year }, { rejectWithValue }) => {
    try {
      // Create first and last day of month
      const firstDay = new Date(year, month - 1, 1);
      const lastDay = new Date(year, month, 0);

      // Format dates as YYYY-MM-DD
      const formattedStartDate = firstDay.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

      const formattedEndDate = lastDay.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });

      const response = await axios.get(
        `https://www.hebcal.com/converter?cfg=json&start=${formattedStartDate}&end=${formattedEndDate}&g2h=1`
      );

      // Transform response to map: gregorian date -> array of events
      const dateMap = {};
      
      // Initialize all dates with empty arrays
      const currentDate = new Date(firstDay);
      while (currentDate <= lastDay) {
        const dateStr = currentDate.toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        dateMap[dateStr] = { hebrew: '', events: [] };
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Fill in hebrew dates
      if (Array.isArray(response.data)) {
        response.data.forEach((item) => {
          if (item.greg && dateMap[item.greg]) {
            dateMap[item.greg].hebrew = item.hebrew || item.greg;
          }
        });
      }

      return dateMap;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      const { date, eventName } = action.payload;
      if (!state.dates[date]) {
        state.dates[date] = { hebrew: date, events: [] };
      }
      state.dates[date].events.push(eventName);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalendarData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCalendarData.fulfilled, (state, action) => {
        state.loading = false;
        state.dates = action.payload;
      })
      .addCase(fetchCalendarData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        alert(`Error loading calendar: ${action.payload}`);
      });
  },
});

export const { addEvent } = calendarSlice.actions;
export default calendarSlice.reducer;
