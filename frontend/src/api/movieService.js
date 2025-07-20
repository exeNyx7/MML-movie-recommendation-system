import axiosInstance from './axiosInstance';

export const movieService = {
    // Get all movies with pagination and filters
    getMovies: async (params = {}) => {
        const response = await axiosInstance.get('/movies', { params });
        return response.data;
    },

    // Get movie by ID
    getMovieById: async (movieId) => {
        const response = await axiosInstance.get(`/movies/${movieId}`);
        return response.data;
    },

    // Create new movie (admin only)
    createMovie: async (movieData) => {
        const response = await axiosInstance.post('/movies', movieData);
        return response.data;
    },

    // Update movie (admin only)
    updateMovie: async (movieId, movieData) => {
        const response = await axiosInstance.put(`/movies/${movieId}`, movieData);
        return response.data;
    },

    // Delete movie (admin only)
    deleteMovie: async (movieId) => {
        const response = await axiosInstance.delete(`/movies/${movieId}`);
        return response.data;
    },

    // Search movies by name
    searchMovies: async (query, params = {}) => {
        const response = await axiosInstance.get('/movies/search', {
            params: { name: query, ...params }
        });
        return response.data;
    },

    // Search and filter movies
    searchAndFilterMovies: async (params = {}) => {
        const response = await axiosInstance.get('/movies/filter', { params });
        return response.data;
    },

    // Get top movies of the month
    getTopMoviesOfMonth: async (params = {}) => {
        const response = await axiosInstance.get('/movies/top/month', { params });
        return response.data;
    },

    // Get top movies by genre
    getTopMoviesByGenre: async (params = {}) => {
        const response = await axiosInstance.get('/movies/top/genre', { params });
        return response.data;
    },

    // Get upcoming movies
    getUpcomingMovies: async (params = {}) => {
        const response = await axiosInstance.get('/movies/upcoming', { params });
        return response.data;
    },

    // Get movie recommendations
    getRecommendations: async (params = {}) => {
        const response = await axiosInstance.get('/recommendations/personalized', { params });
        return response.data;
    },

    // Get similar movies
    getSimilarMovies: async (movieId, params = {}) => {
        const response = await axiosInstance.get(`/recommendations/similar/${movieId}`, { params });
        return response.data;
    },

    // Get trending movies (recommendations)
    getTrendingRecommendations: async (params = {}) => {
        const response = await axiosInstance.get('/recommendations/trending', { params });
        return response.data;
    },

    // Get top rated recommendations
    getTopRatedRecommendations: async (params = {}) => {
        const response = await axiosInstance.get('/recommendations/top-rated', { params });
        return response.data;
    }
}; 