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
    getTopMoviesByGenre
} = require('../controllers/movieController');

router.post('/', addMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);
router.get('/', getAllMovies);
router.get('/search', searchMovieByName); // Route to handle searching by name
// route for search and filter
router.get('/filter', searchAndFilterMovies);
router.get('/:id', getMovie);

router.get('/top/month', getTopMoviesOfMonth);
router.get('/top/genre', getTopMoviesByGenre); 

module.exports = router;
