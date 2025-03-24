import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // fallback to localhost for development
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
