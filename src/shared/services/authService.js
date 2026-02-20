import { request } from "./client";

// abstraksi api call untuk otentikasi
export const AuthService = {
  register: (email, password, fullname) => {
    request({
      url: '/auth/register',
      method: 'POST',
      data: {
        email, password, fullname
      }
    });
  },
  login: (email, password) => {
    request({
      url: '/auth/login',
      method: 'POST',
      data: {
        email, password
      }
    })
  },
  verifyOtp: (email, otp) => {
    request({
      url: '/auth/verify-otp',
      method: 'POST',
      data: {
        email, otp
      }
    });
  },
  resendOtp: (email) => {
    request({
      url: '/auth/resend-otp',
      method: 'POST',
      data: {
        email
      }
    });
  },
  forgotPassword: (email) => {
    request({
      url: '/auth/forgot-password',
      method: 'POST',
      data: {
        email
      }
    });
  },
  resetPassword: (email, otp, password) => {
    request({
      url: '/auth/reset-password',
      method: 'POST',
      data: {
        email, otp, password
      }
    });
  },
  refreshToken: (refreshToken) => {
    request({
      url: '/auth/refresh-token',
      method: 'POST',
      data: {
        refreshToken
      }
    });
  },
  logout: () => {
    request({
      url: '/auth/logout',
      method: 'POST'
    });
  }
}