import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
  },
  reducers: {
    fill(state, action) {
      state.events = [...action.payload.events];
    },

    empty(state) {
      state.events.splice(0, state.events.length);
    },

    add(state, action) {
      state.events.unshift(action.payload.event);
    },

    remove(state, action) {
      const eventIndex = state.events.findIndex(
        (event) => event.id === action.payload.id
      );
      state.events.splice(eventIndex, 1);
    },
  },
});

export const eventsActions = eventsSlice.actions;

export default eventsSlice;
