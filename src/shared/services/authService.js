import { request } from "./client";

// abstraksi api call untuk otentikasi
export const AuthService = {
  register: (email, password, fullname) => {
    return request({
      url: "/auth/register",
      method: "POST",
      data: {
        email,
        password,
        fullname,
      },
    });
  },
  login: (email, password) => {
    return request({
      url: "/auth/login",
      method: "POST",
      data: {
        email,
        password,
      },
    });
  },
  verifyOtp: (email, otp) => {
    return request({
      url: "/auth/verify-otp",
      method: "POST",
      data: {
        email,
        otp,
      },
    });
  },
  resendOtp: (email) => {
    return request({
      url: "/auth/resend-otp",
      method: "POST",
      data: {
        email,
      },
    });
  },
  forgotPassword: (email) => {
    return request({
      url: "/auth/forgot-password",
      method: "POST",
      data: {
        email,
      },
    });
  },
  resetPassword: (email, otp, password) => {
    return request({
      url: "/auth/reset-password",
      method: "POST",
      data: {
        email,
        otp,
        password,
      },
    });
  },
  refreshToken: (refreshToken) => {
    return request({
      url: "/auth/refresh-token",
      method: "POST",
      data: {
        refreshToken,
      },
    });
  },
  logout: () => {
    return request({
      url: "/auth/logout",
      method: "POST",
    });
  },
};
