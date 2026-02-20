import axios from "axios";

// Axios instance
const api = axios.create({
  baseURL: 'https://api.domain-anda.com/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Auth token request interceptor
api.interceptors.request.use(
  (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
  },
  (error) => Promise.reject(error),
);

/// Response error handling & token refresh
/// TODO!

export default api;

// Request wrapper
export const request = async ({...options}) => {
  try {
    const response = await api(options);
    return response.data;
  } catch (err) {
    console.error("API Error:", error.message, error.errors);
    throw err; // re-throw error for components
  }
};

