const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    registerAdmin,
    loginAdmin,
    updateUser,
    deleteUser,
    getUserProfile,
    updateUserPreferences,
    updateWishlist,
    getWishlist
} = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');
const adminRoleCheck = require('../middlewares/roleCheck');

// Authentication routes
router.post('/register', registerUser); // Register a new user
router.post('/login', loginUser); // Login a user
router.post('/register-admin', registerAdmin); // Register a new admin
router.post('/login-admin', loginAdmin); // Login an admin

// Admin routes
// router.delete('/delete', authenticate, adminRoleCheck, deleteUser);
router.delete('/delete/:userId?', authenticate, adminRoleCheck, deleteUser);


// User profile management routes
router.put('/update', authenticate, updateUser); // Update user profile
// router.delete('/delete', authenticate, deleteUser);
// router.get('/profile', authenticate, getUserProfile);
router.get('/profile/:userId?', authenticate, getUserProfile); // Get user profile

// Preferences and wishlist routes
router.put('/preferences', authenticate, updateUserPreferences); // Update user preferences

// Routes for managing user's wishlist
// router.put('/wishlist', updateWishlist);
// router.get('/wishlist/:userId', getWishlist);

// Wishlist routes
router.put('/wishlist', authenticate, updateWishlist); // Update user's wishlist
router.get('/wishlist/:userId?', authenticate, getWishlist); // Get user's wishlist

module.exports = router;
