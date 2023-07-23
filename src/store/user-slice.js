import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  initialState: { user: null },
  name: "userDetails",
  reducers: {
    add(state, action) {
      console.log(action.payload);
      state.user = action.payload;
    },
    clear(state, action) {
      state.user = null;
    },
  },
});

export const userDetailActions = userSlice.actions;

export default userSlice;
