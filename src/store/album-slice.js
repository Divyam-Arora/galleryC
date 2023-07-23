import { createSlice } from "@reduxjs/toolkit";
import {
  initialPageState,
  append,
  newItem,
  empty,
  reset,
  refresh,
  add,
  remove,
  search,
  update,
} from "./page-actions";

const albumSlice = createSlice({
  name: "album",
  initialState: {
    ...initialPageState,
    item: null,
    search: "",
  },
  reducers: {
    newItem,
    append,
    empty,
    reset,
    refresh,
    editMedia(state, action) {
      add(state, { payload: { list: action.payload.toAdd } });
      remove(state, { payload: { list: action.payload.toRemove } });
    },
    update,
    search,
    add,
    remove,
  },
});

export const albumActions = albumSlice.actions;
export default albumSlice;
