import axiosInstance from './axiosInstance';

export const reviewService = {
    // Get reviews for a movie
    getMovieReviews: async (movieId, params = {}) => {
        const response = await axiosInstance.get(`/reviews/movie/${movieId}`, { params });
        return response.data;
    },

    // Get user reviews
    getUserReviews: async (userId, params = {}) => {
        const response = await axiosInstance.get(`/reviews/user/${userId}`, { params });
        return response.data;
    },

    // Create a review
    createReview: async (reviewData) => {
        const response = await axiosInstance.post('/reviews', reviewData);
        return response.data;
    },

    // Rate and review a movie
    rateAndReview: async (movieId, reviewData) => {
        const response = await axiosInstance.post('/reviews/rate-review', {
            movieId,
            ...reviewData
        });
        return response.data;
    },

    // Update a review
    updateReview: async (reviewId, reviewData) => {
        const response = await axiosInstance.put(`/reviews/${reviewId}`, reviewData);
        return response.data;
    },

    // Delete a review
    deleteReview: async (reviewId) => {
        const response = await axiosInstance.delete(`/reviews/${reviewId}`);
        return response.data;
    },

    // Get review by ID
    getReviewById: async (reviewId) => {
        const response = await axiosInstance.get(`/reviews/${reviewId}`);
        return response.data;
    },

    // Get top reviews for a movie
    getTopReviews: async (movieId, params = {}) => {
        const response = await axiosInstance.get(`/reviews/movie/${movieId}/top`, { params });
        return response.data;
    },

    // Get recent reviews
    getRecentReviews: async (params = {}) => {
        const response = await axiosInstance.get('/reviews/recent', { params });
        return response.data;
    }
}; 