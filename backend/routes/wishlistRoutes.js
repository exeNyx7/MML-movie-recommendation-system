const express = require('express');
const router = express.Router();
const {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    checkWishlistStatus,
    clearWishlist
} = require('../controllers/wishlistController');
const authenticate = require('../middlewares/authMiddleware');

// All wishlist routes require authentication
router.use(authenticate);

// Get user's wishlist
router.get('/', getWishlist);

// Add movie to wishlist
router.post('/', addToWishlist);

// Remove movie from wishlist
router.delete('/:movieId', removeFromWishlist);

// Check if movie is in wishlist
router.get('/check/:movieId', checkWishlistStatus);

// Clear entire wishlist
router.delete('/', clearWishlist);

module.exports = router; 