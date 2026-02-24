import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  const accessToken = localStorage.getItem("access_token");
  const storedUser = localStorage.getItem("user");
  try {
    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      accessToken: accessToken || null,
      isAuthenticated: Boolean(accessToken),
    };
  } catch (error) {
    return {
      user: null,
      accessToken: null,
      isAuthenticated: false,
    };
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;

      // update state
      state.user = user;
      state.accessToken = accessToken;
      state.isAuthenticated = true;

      // persist (local storage, unknown if backend send cookies or not)
      if (accessToken) localStorage.setItem("access_token", accessToken);
      if (refreshToken) localStorage.setItem("refresh_token", refreshToken);
      if (user) localStorage.setItem("user", JSON.stringify(user));
    },
    setTokens: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      if (accessToken) {
        state.accessToken = accessToken;
        localStorage.setItem("access_token", accessToken);
      }
      if (refreshToken) {
        localStorage.setItem("refresh_token", refreshToken);
      }
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
