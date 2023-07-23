import { createSlice } from "@reduxjs/toolkit";
import {
  fill,
  append,
  empty,
  reset,
  refresh,
  add,
  remove,
  updateRecent,
  initialPageState,
} from "./page-actions";

const albumsSlice = createSlice({
  name: "albums",
  initialState: {
    ...initialPageState,
    search: "",
  },
  reducers: {
    fill,

    append,

    empty,

    reset,

    refresh,

    add,

    updateRecent,

    update(state, action) {
      const albumIndex = state.list.findIndex(
        (val) => val.id == action.payload.item.id
      );
      state.list[albumIndex] = {
        ...state.list[albumIndex],
        ...action.payload.item,
      };
    },

    remove,

    search(state, action) {
      if (state.search != action.payload.search) {
        state.search = action.payload.search;
        empty(state);
      }
    },
  },
});

export const albumsActions = albumsSlice.actions;

export default albumsSlice;
