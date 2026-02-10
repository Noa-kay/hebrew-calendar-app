import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  dates: {},
  loading: false,
  error: null,
};

export const fetchCalendarData = createAsyncThunk(
  'calendar/fetchCalendarData',
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const firstDay = new Date(year, month - 1, 1);
      const lastDay = new Date(year, month, 0);

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

      const dateMap = {};
      const data = response.data;
      
      // Handle both array and object responses
      const items = Array.isArray(data) ? data : (data.events || Object.values(data));
      
      if (Array.isArray(items)) {
        items.forEach((item) => {
          if (item.greg) {
            if (!dateMap[item.greg]) {
              dateMap[item.greg] = {
                hebrew: item.hebrew || '',
                events: []
              };
            }
            if (item.hebrew && !dateMap[item.greg].hebrew) {
              dateMap[item.greg].hebrew = item.hebrew;
            }
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
