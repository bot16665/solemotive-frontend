import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://solvemotive-backend.onrender.com/api',  // Production backend URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true  // Important for CORS
});

// Add a request interceptor for handling tokens
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Handle unauthorized
          break;
        case 404:
          // Handle not found
          break;
        case 500:
          // Handle server error
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
