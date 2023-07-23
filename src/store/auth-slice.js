import { createSlice } from "@reduxjs/toolkit";

const checkAuth = () => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    return {
      accessToken: accessToken,
      isLoggedIn: true,
      userName: localStorage.getItem("userName"),
      expirationDate: localStorage.getItem("expirationDate"),
    };
  }

  return {
    accessToken: "",
    isLoggedIn: false,
    userName: "",
    expirationDate: "",
  };
};

const storeAuth = (authDetails) => {
  localStorage.setItem("access_token", authDetails.accessToken);
  localStorage.setItem("refresh_token", authDetails.refreshToken);
  localStorage.setItem("userName", authDetails.userName);
  localStorage.setItem("expirationDate", authDetails.expirationDate);
};

const clearStorage = () => {
  localStorage.clear();
};

const authSlice = createSlice({
  name: "Auth",
  initialState: checkAuth(),
  reducers: {
    login(state, action) {
      storeAuth(action.payload);
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLoggedIn = true;
      state.userName = action.payload.userName;
      state.expirationDate = action.payload.expirationDate;
    },

    logout(state) {
      clearStorage();
      state.accessToken = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
      state.userName = null;
      state.fullName = null;
      state.email = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
