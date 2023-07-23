import { createSlice } from "@reduxjs/toolkit";

const peopleSlice = createSlice({
  name: "people",
  initialState: {
    list: [],
    search: "",
  },
  reducers: {
    fill(state, action) {
      state.list = [...action.payload.list];
    },

    empty(state) {
      state.list.splice(0, state.list.length);
    },

    reset(state) {
      state.list.splice(0, state.list.length);
      state.search = "";
    },

    search(state, action) {
      if (state.search != action.payload.search) {
        state.search = action.payload.search;
        state.list = [];
      }
    },
  },
});

export const peopleActions = peopleSlice.actions;

export default peopleSlice;
