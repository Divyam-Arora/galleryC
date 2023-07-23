import { createSlice } from "@reduxjs/toolkit";

const uploadSlice = createSlice({
  name: "upload",
  initialState: { active: [], passive: [] },
  reducers: {
    appendActive(state, action) {
      state.active.push(...action.payload.list);
    },

    appendPassive(state, action) {
      state.passive.unshift(...action.payload.list);
    },

    shift(state, action) {
      const removed = state.active.splice(
        state.active.findIndex((item) => item.id == action.payload.id),
        1
      );
      state.passive.unshift({
        ...removed[0],
        tag: action.payload.tag,
        description: action.payload.description,
      });
    },

    clear(state) {
      state.passive.forEach((item) => {
        URL.revokeObjectURL(item.file);
      });
      state.passive = [];
    },
  },
});

export const uploadActions = uploadSlice.actions;
export default uploadSlice;
