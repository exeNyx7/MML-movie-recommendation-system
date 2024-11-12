const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    getUserProfile,
    updateUserPreferences,
    updateWishlist,
    getWishlist
} = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');

// Authentication routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// User profile management routes
router.put('/update', authenticate, updateUser);
router.delete('/delete', authenticate, deleteUser);
router.get('/profile', authenticate, getUserProfile);

// Preferences and wishlist routes
router.put('/preferences', authenticate, updateUserPreferences);
router.put('/wishlist', authenticate, updateWishlist);
router.get('/wishlist', authenticate, getWishlist);

module.exports = router;
