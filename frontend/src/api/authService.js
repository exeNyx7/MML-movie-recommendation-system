import axiosInstance from './axiosInstance';

export const authService = {
    // User registration
    register: async (userData) => {
        const response = await axiosInstance.post('/users/register', userData);
        return response.data;
    },

    // User login
    login: async (credentials) => {
        const response = await axiosInstance.post('/users/login', credentials);
        return response.data;
    },

    // Admin registration
    registerAdmin: async (adminData) => {
        const response = await axiosInstance.post('/users/register-admin', adminData);
        return response.data;
    },

    // Admin login
    loginAdmin: async (credentials) => {
        const response = await axiosInstance.post('/users/login-admin', credentials);
        return response.data;
    },

    // Get user profile
    getProfile: async (userId) => {
        const response = await axiosInstance.get(`/users/profile/${userId}`);
        return response.data;
    },

    // Update user profile
    updateProfile: async (userData) => {
        const response = await axiosInstance.put('/users/profile', userData);
        return response.data;
    },

    // Update user preferences
    updatePreferences: async (preferences) => {
        const response = await axiosInstance.put('/users/preferences', preferences);
        return response.data;
    },

    // Delete user (admin only)
    deleteUser: async (userId) => {
        const response = await axiosInstance.delete(`/users/${userId}`);
        return response.data;
    },

    // Get user wishlist
    getWishlist: async (userId) => {
        const response = await axiosInstance.get(`/users/wishlist/${userId}`);
        return response.data;
    },

    // Update user wishlist
    updateWishlist: async (movies) => {
        const response = await axiosInstance.put('/users/wishlist', { movies });
        return response.data;
    },

    // Logout (client-side)
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    // Get current user from localStorage
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // Set user data in localStorage
    setUserData: (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
    },

    // Set token in localStorage
    setToken: (token) => {
        localStorage.setItem('token', token);
    }
}; 