import axios from "axios";
import api, { request } from "./client";

const BASE_URL = "/api";

// Axios instance
const authApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

// abstraksi api call untuk otentikasi
export const AuthService = {
  register: ({ email, password, fullname }) => {
    return authApi.post("/auth/register", {
      email,
      password,
      fullname,
    });
  },
  login: ({ email, password }) => {
    return authApi.post("/auth/login", {
      email,
      password,
    });
  },
  verifyOtp: ({ email, otp }) => {
    return authApi.post("/auth/verify-otp", {
      email,
      otp,
    });
  },
  resendOtp: (email) => {
    return authApi.post("/auth/resend-otp", {
      email,
    });
  },
  forgotPassword: (email) => {
    return authApi.post("/auth/forgot-password", {
      email,
    });
  },
  resetPassword: (email, otp, password) => {
    return authApi.post("/auth/reset-password", {
      email,
      otp,
      password,
    });
  },
  refresh: (refreshToken) => {
    return authApi.post("/auth/refresh-token", {
      refreshToken,
    });
  },

  logout: () => {
    return request({
      url: "/auth/logout",
      method: "POST",
    });
  },
};
