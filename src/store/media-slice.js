import { createSlice } from "@reduxjs/toolkit";
import {
  initialPageState,
  newItem,
  updateItem,
  empty,
  reset,
  refresh,
} from "./page-actions";

const mediaSlice = createSlice({
  name: "media",
  initialState: { ...initialPageState, item: null, search: "" },
  reducers: {
    newItem,
    updateItem,
    empty,
    reset,
    refresh,
  },
});

export const mediaActions = mediaSlice.actions;

export default mediaSlice;
