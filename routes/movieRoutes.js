const express = require('express');
const router = express.Router();
const { addMovie, updateMovie, deleteMovie, getAllMovies, getMovie, searchMovieByName } = require('../controllers/movieController');

router.post('/', addMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);
router.get('/', getAllMovies);
router.get('/search', searchMovieByName); // Route to handle searching by name
router.get('/:id', getMovie);

module.exports = router;
