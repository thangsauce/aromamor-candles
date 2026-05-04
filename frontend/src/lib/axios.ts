import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5000",
  withCredentials: true, // sends cookies for JWT auth
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Request interceptor ──────────────────────────────────────────────────────
// Automatically attach JWT token from localStorage to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("aromamor_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response interceptor ─────────────────────────────────────────────────────
// Handle 401 (unauthorized) globally.
// Keep public storefront routes accessible; only force auth on dashboards.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("aromamor_token");
      const currentHash = window.location.hash || "#/";
      if (currentHash.startsWith("#/admin") || currentHash.startsWith("#/dashboard")) {
        window.location.hash = "#/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
