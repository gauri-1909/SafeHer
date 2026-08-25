import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://safeher-backend-tjsa.onrender.com';

const apiClient = axios.create({ baseURL: BASE_URL });

// Attach the JWT (if present) to every outgoing request.
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('safeher_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the token is invalid/expired, the backend returns 401 — clear local
// auth state so the app doesn't sit in a broken "logged in but not really" state.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('safeher_token');
      localStorage.removeItem('safeher_user');
    }
    return Promise.reject(error);
  }
);

export default apiClient;