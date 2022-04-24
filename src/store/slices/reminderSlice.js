import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const reminderSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    add: (state, action) => {
      const payload = action.payload;
      state[payload.date] = {
        ...state[payload.date],
        [payload.time]: {
          time: payload.time,
          description: payload.description,
          city: payload.city,
          weather: payload.weather
        }
      };
    },
    remove: (state, action) => {
      const payload = action.payload;
      delete state[payload.date][payload.time];
    },
    edit: (state, action) => {
      const payload = action.payload;
      delete state[payload.date][payload.time];
      state[payload.date] = {
        ...state[payload.date],
        [payload.newTime]: {
          time: payload.newTime,
          description: payload.description,
          city: payload.city,
          weather: payload.weather
        }
      };
    }
  }
});

export const { add, remove, edit } = reminderSlice.actions;

export default reminderSlice.reducer;
