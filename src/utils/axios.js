import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://solvemotive-backend.onrender.com/api',  // Added /api to match your routes
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true  // Important for CORS
});

export default api;
