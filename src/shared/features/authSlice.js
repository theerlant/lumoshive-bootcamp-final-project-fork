import { createSlice } from "@reduxjs/toolkit";

const savedToken = localStorage.getItem("access_token");
const savedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: savedUser || null,
  accessToken: savedToken || null,
  isAuthenticated: Boolean(savedToken),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, access_token, refresh_token } = action.payload;

      // update state
      state.user = user;
      state.accessToken = access_token;
      state.isAuthenticated = true;

      // persist
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    setTokens: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
    },
    logout: (state) => {
      // update state
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;

      // remove from local storage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, setTokens, logout } = authSlice.actions;
export default authSlice.reducer;
