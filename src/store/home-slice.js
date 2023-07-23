import { createSlice } from "@reduxjs/toolkit";
import {
  fill,
  add,
  append,
  empty,
  reset,
  remove,
  initialPageState,
} from "./page-actions";

const initialSearch = {
  page: -1,
  hasNext: true,
  list: [],
};

const homeSlice = createSlice({
  name: "home",
  initialState: {
    ...initialPageState,
    search: { date: null, month: null, year: null },
    searchPage: { ...initialSearch },
  },
  reducers: {
    fill,

    empty,

    reset,

    append,

    add,

    remove,

    search(state, action) {
      if (
        state.search.date != action.payload.search.date ||
        state.search.month != action.payload.search.month ||
        state.search.year != action.payload.search.year
      ) {
        state.search = action.payload.search;
        state.searchPage = { ...initialSearch };
      }
    },

    appendSearch(state, action) {
      state.searchPage.list.push(...action.payload.list);
      if (action.payload.list.length > 0)
        state.searchPage.page = action.payload.page;
      state.searchPage.hasNext = action.payload.hasNext;
    },
  },
});

export const homeActions = homeSlice.actions;

export default homeSlice;
