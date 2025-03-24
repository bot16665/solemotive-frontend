import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://solemotive-backend.onrender.com/api',  // Your Render backend URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true  // Important for CORS
});

export default api;
