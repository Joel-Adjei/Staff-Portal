import axios from 'axios'; // Import axios


// Define the base URL for your Express backend
const API_BASE_URL = 'http://localhost:1972/api';

// --- API Service Helper (using Axios) ---
export const api = {
    get: async (path) => {
        const response = await axios.get(`${API_BASE_URL}${path}`);
        return response.data;
    },
    post: async (path, data) => {
        const response = await axios.post(`${API_BASE_URL}${path}`, data);
        return response.data;
    },
    put: async (path, data) => {
        const response = await axios.put(`${API_BASE_URL}${path}`, data);
        return response.data;
    },
    delete: async (path) => {
        const response = await axios.delete(`${API_BASE_URL}${path}`);
        return response.data;
    },
};
