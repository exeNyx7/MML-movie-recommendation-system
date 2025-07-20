import axiosInstance from './axiosInstance';

export const wishlistService = {
    // Get user's wishlist
    getWishlist: async () => {
        const response = await axiosInstance.get('/wishlist');
        return response.data;
    },

    // Add movie to wishlist
    addToWishlist: async (movieId) => {
        const response = await axiosInstance.post('/wishlist', { movieId });
        return response.data;
    },

    // Remove movie from wishlist
    removeFromWishlist: async (movieId) => {
        const response = await axiosInstance.delete(`/wishlist/${movieId}`);
        return response.data;
    },

    // Check if movie is in wishlist
    checkWishlistStatus: async (movieId) => {
        const response = await axiosInstance.get(`/wishlist/check/${movieId}`);
        return response.data;
    },

    // Clear entire wishlist
    clearWishlist: async () => {
        const response = await axiosInstance.delete('/wishlist');
        return response.data;
    }
}; 