import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUser: null,
    loading: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.loggedInUser = action.payload;
    },
    loginError: (state) => {
      state.loading = false;
      state.error = true;
    },
    signupStart: (state) => {
      state.loading = true;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.loggedInUser = action.payload;
    },
    signupError: (state) => {
      state.loading = false;
      state.error = true;
    },
    logoutUser: (state) => {
      state.loggedInUser = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginError,
  signupStart,
  signupSuccess,
  signupError,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;
