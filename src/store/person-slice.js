import { createSlice } from "@reduxjs/toolkit";
import {
  initialPageState,
  append,
  newItem,
  updateItem,
  fill,
  empty,
  reset,
  refresh,
  add,
  remove,
  search,
} from "./page-actions";

const personSlice = createSlice({
  name: "Person",
  initialState: {
    ...initialPageState,
    item: null,
    search: "",
  },
  reducers: {
    append,
    newItem,
    updateItem,
    fill,
    empty,
    reset,
    refresh,
    editMedia(state, action) {
      add(state, { payload: { list: action.payload.toAdd } });
      remove(state, { payload: { list: action.payload.toRemove } });
    },
    add,
    remove,
    search,
  },
});

export const personActions = personSlice.actions;

export default personSlice;
