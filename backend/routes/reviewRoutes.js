const express = require('express');
const router = express.Router();
const { 
    addReview, 
    updateReview, 
    getMovieReviews, 
    getReviewHighlights, 
    rateMovie, 
    rateAndReviewMovie 
} = require('../controllers/reviewController');
const authenticate = require('../middlewares/authMiddleware');
const adminRoleCheck = require('../middlewares/roleCheck');

// Existing routes
router.post('/', addReview);
router.put('/:reviewId', updateReview);
router.get('/movie/:movieId', getMovieReviews);
router.get('/highlights', getReviewHighlights);

// <IMPORTANT> might add it when fixed my rateMovie method.
// New routes for rating a movie
// router.post('/rate', rateMovie);

// New route for rating and reviewing a movie
router.post('/rate-review', rateAndReviewMovie);

module.exports = router;
