const express = require('express');
const router = express.Router();
const {
    addMovie,
    updateMovie,
    deleteMovie,
    getAllMovies,
    getMovie,
    searchMovieByName,
    searchAndFilterMovies,
    getTopMoviesOfMonth,
    getTopMoviesByGenre,
    getUpcomingMovies
} = require('../controllers/movieController');
const authenticate = require('../middlewares/authMiddleware');
const adminRoleCheck = require('../middlewares/roleCheck');

// ADD ADMIN ROLE FOR THE BASIC CRUD AND SOME EXTRA FUNCTIONS
router.post('/', authenticate, adminRoleCheck, addMovie);
router.put('/:id', authenticate, adminRoleCheck, updateMovie);
router.delete('/:id', authenticate, adminRoleCheck, deleteMovie);
router.get('/', getAllMovies);
router.get('/search', searchMovieByName); // Route to handle searching by name

router.get('/filter', searchAndFilterMovies); // route for search and filter

router.get('/top/month', getTopMoviesOfMonth);
router.get('/top/genre', getTopMoviesByGenre);
router.get('/upcoming', getUpcomingMovies);

router.get('/:id', getMovie);


module.exports = router;
