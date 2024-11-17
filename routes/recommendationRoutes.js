const express = require('express');
const router = express.Router();
const {
    getPersonalizedRecommendations,
    getSimilarTitles,
    getTrendingMovies,
    getTopRatedMovies
} = require('../controllers/recommendationController');
const authenticate = require('../middlewares/authMiddleware');

// Recommendation routes
router.get('/personalized', authenticate, getPersonalizedRecommendations); // Get personalized recommendations
router.get('/similar/:movieId', getSimilarTitles); // Get similar titles
router.get('/trending', getTrendingMovies); // Get trending movies
router.get('/top-rated', getTopRatedMovies); // Get top-rated movies

module.exports = router;
