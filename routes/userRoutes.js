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
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/register-admin', registerAdmin);
router.post('/login-admin', loginAdmin);

// Admin routes
// router.delete('/delete', authenticate, adminRoleCheck, deleteUser);
router.delete('/delete/:userId?', authenticate, adminRoleCheck, deleteUser);


// User profile management routes
router.put('/update', authenticate, updateUser);
// router.delete('/delete', authenticate, deleteUser);
// router.get('/profile', authenticate, getUserProfile);
router.get('/profile/:userId?', authenticate, getUserProfile);

// Preferences and wishlist routes
router.put('/preferences', authenticate, updateUserPreferences);

// Routes for managing user's wishlist
// router.put('/wishlist', updateWishlist);
// router.get('/wishlist/:userId', getWishlist);

// Wishlist routes (accessible by any authenticated user)
router.put('/wishlist', authenticate, updateWishlist);
router.get('/wishlist/:userId?', authenticate, getWishlist);

module.exports = router;
