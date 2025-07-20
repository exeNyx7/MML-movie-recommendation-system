import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding auth token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;

        if (response) {
            switch (response.status) {
                case 401:
                    toast.error('Authentication failed. Please login again.');
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                    break;
                case 403:
                    toast.error('Access denied. You do not have permission for this action.');
                    break;
                case 404:
                    toast.error('Resource not found.');
                    break;
                case 409:
                    toast.error('Resource already exists.');
                    break;
                case 422:
                    toast.error('Validation error. Please check your input.');
                    break;
                case 500:
                    toast.error('Server error. Please try again later.');
                    break;
                default:
                    toast.error('An error occurred. Please try again.');
            }
        } else {
            toast.error('Network error. Please check your connection.');
        }

        return Promise.reject(error);
    }
);

export default axiosInstance; 