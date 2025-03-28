import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://solvemotive-backend.onrender.com/api',  // Added /api to match your routes
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true  // Important for CORS
});

// Example function using XMLHttpRequest
function fetchProductsWithXHR() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${api.defaults.baseURL}/products`, true);
    xhr.withCredentials = true; // Include credentials
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
            console.log(response);
        } else {
            console.error('Request failed with status:', xhr.status);
        }
    };
    xhr.onerror = function() {
        console.error('Request failed');
    };
    xhr.send();
}

// Export the axios instance and the XMLHttpRequest function
export default api;
export { fetchProductsWithXHR };
