import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Sample data from API for January 2026
const initialState = {
  dates: {
    '2026-01-01': [],
    '2026-01-02': [],
    '2026-01-03': [],
    '2026-01-04': [],
    '2026-01-05': [],
    '2026-01-06': [],
    '2026-01-07': [],
    '2026-01-08': [],
    '2026-01-09': [],
    '2026-01-10': [],
    '2026-01-11': [],
    '2026-01-12': [],
    '2026-01-13': [],
    '2026-01-14': [],
    '2026-01-15': [],
    '2026-01-16': [],
    '2026-01-17': [],
    '2026-01-18': [],
    '2026-01-19': [],
    '2026-01-20': [],
    '2026-01-21': [],
    '2026-01-22': [],
    '2026-01-23': [],
    '2026-01-24': [],
    '2026-01-25': [],
    '2026-01-26': [],
    '2026-01-27': [],
    '2026-01-28': [],
    '2026-01-29': [],
    '2026-01-30': [],
    '2026-01-31': [],
  },
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
      
      response.data.forEach((item) => {
        if (item.greg) {
          dateMap[item.greg] = dateMap[item.greg] || [];
        }
      });

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
        state.dates[date] = [];
      }
      state.dates[date].push(eventName);
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
