import { createSlice } from "@reduxjs/toolkit";

const httpStateSlice = createSlice({
  name: "httpState",
  initialState: { isLoading: false, error: null, appSpinner: true },
  reducers: {
    send(state, action) {
      // console.log("in it");
      if (action.payload.loadingState) state.isLoading = true;
      state.error = null;
      // console.log(action?.payload?.appSpinner);
      if (action.payload.loadingState)
        state.appSpinner = action.payload.appSpinner;
    },

    response(state) {
      state.isLoading = false;
    },

    error(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      // console.log(action.payload);
    },

    clean(state) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const httpStateActions = httpStateSlice.actions;

export default httpStateSlice;
