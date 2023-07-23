import { createSlice } from "@reduxjs/toolkit";
import {
  add,
  append,
  empty,
  fill,
  initialPageState,
  remove,
  reset,
  refresh,
  update,
  updateOrAdd,
  updateRecent,
  search,
} from "./page-actions";

const shareSlice = createSlice({
  name: "share",
  initialState: { ...initialPageState, search: "" },
  reducers: {
    add,
    append,
    empty,
    fill,
    remove,
    reset,
    refresh,
    update,
    updateOrAdd,
    updateRecent,
    search,
  },
});

export const shareActions = shareSlice.actions;
export default shareSlice;
