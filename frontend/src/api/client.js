import axios from "axios";

// 1. Read your environment variable (for Vercel), or fallback to your local setup
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const apiClient = axios.create({
  // 2. Point directly to the full backend server URL
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.error?.message ||
      err.message ||
      "Request failed";
    return Promise.reject({
      status: err.response?.status,
      message,
      details: err.response?.data?.error?.details,
      original: err,
    });
  }
);