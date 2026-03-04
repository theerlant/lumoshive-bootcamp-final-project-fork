import axios from "axios";
import store from "../features/store";

import { logout, setTokens } from "../features/authSlice";

const BASE_URL = "/api";

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

// Auth token request interceptor
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;
const queue = [];

const retryQueue = (error, token = null) => {
  queue.forEach((callback) => {
    if (error) {
      callback.reject(error);
    } else {
      callback.resolve(token);
    }
  });
};

/// Response error handling & token refresh
api.interceptors.response.use(
  (response) => response, // forward success
  async (error) => {
    const originalRequest = error.config;

    // catch 401 error
    if (error.response.status === 401 && originalRequest.retry !== true) {
      // if already doing refresh token
      // make a promise object and push it to the queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // If no refresh in progress
      originalRequest.retry = true;
      isRefreshing = true;

      try {
        // get refresh token
        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) {
          store.dispatch(logout());
          return Promise.reject(new Error("Refresh token is not available"));
        }

        //not use the client to prevent interceptor loops
        const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
          refreshToken,
        });

        const { access_token, refresh_token } = response.data;

        // save new token
        store.dispatch(
          setTokens({
            accessToken: access_token,
            refreshToken: refresh_token,
          }),
        );

        // retry all queue with new token
        retryQueue(null, access_token);

        // retry original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        // errors to all queue
        retryQueue(refreshError, null);
        store.dispatch(logout());
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // return other error
    return Promise.reject(error);
  },
);

export default api;

// Request wrapper
/**
 * wrapper for request with basic error logging
 * @param {import("axios").AxiosRequestConfig} options
 * @returns data if success, throw error if failed
 */
export const request = async (options) => {
  console.log("running api call: ", options);
  try {
    const response = await api(options);
    return response.data;
  } catch (error) {
    console.error(
      "API Error:",
      error.message,
      error.errors,
      "Backend message:",
      error.response?.data?.message, // log message error dari be
      "Backend errors: ",
      error.response?.data?.errors, // log list error jika ada
    );
    throw error; // re-throw error for components
  }
};
