import { createSlice } from "@reduxjs/toolkit";
import {
  initialPageState,
  append,
  newItem,
  updateItem,
  empty,
  reset,
  add,
  remove,
  search,
  update,
  updateRecent,
} from "./page-actions";
import { actions } from "../util/helpers";

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    ...initialPageState,
    item: null,
    search: "",
  },
  reducers: {
    newItem,
    updateItem,
    append,
    empty,
    reset,
    editMedia(state, action) {
      add(state, { payload: { list: action.payload.toAdd } });
      remove(state, { payload: { list: action.payload.toRemove } });
    },
    editActivity(state, action) {
      const toAdd = [];
      if (state.initialRequest) {
        action.payload.list.forEach((activity) => {
          if (
            state.list?.[0]?.id != activity.id &&
            state.list?.[1]?.id != activity.id
          )
            if (activity.action == actions.UnShared_Activity) {
              update(state, {
                payload: { item: activity.target, isListItem: true },
              });
            } else {
              toAdd.push(activity);
            }
        });
        add(state, { payload: { list: toAdd } });
      }
    },
    update,
    updateRecent,
    search,
    add,
    remove,
  },
});

export const conversationActions = conversationSlice.actions;
export default conversationSlice;
