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
    getUpcomingMovies, 
    setReminder,
    getMoviesWithReminders,
    getAllMoviesWithReminders,
    getRemindersByUserId,
    getUsersByMovieName,
    getUsersByMovieId
} = require('../controllers/movieController');
const authenticate = require('../middlewares/authMiddleware');
const adminRoleCheck = require('../middlewares/roleCheck');

router.post('/', addMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);
router.get('/', getAllMovies);
router.get('/search', searchMovieByName); // Route to handle searching by name
// route for search and filter
router.get('/filter', searchAndFilterMovies);

router.get('/top/month', getTopMoviesOfMonth);
router.get('/top/genre', getTopMoviesByGenre); 
router.get('/upcoming', getUpcomingMovies);

router.post('/set-reminder/:movieId', authenticate, setReminder);
router.get('/reminders', authenticate, getMoviesWithReminders);
router.get('/reminders/all', authenticate, getAllMoviesWithReminders);
router.get('/reminders/user/:userId', authenticate, getRemindersByUserId);
router.get('/reminders/movie/name/:movieName', authenticate, getUsersByMovieName);
router.get('/reminders/movie/id/:movieId', authenticate, getUsersByMovieId);

router.get('/:id', getMovie);


module.exports = router;
