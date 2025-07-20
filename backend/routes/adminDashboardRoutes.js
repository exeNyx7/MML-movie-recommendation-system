
const express = require('express');
const router = express.Router();
const adminDashboardController = require('../controllers/AdminDashboardController');
const adminRoleCheck = require('../middlewares/roleCheck');
const authenticate = require('../middlewares/authMiddleware');

router.get('/most-popular-movies', authenticate, adminRoleCheck, adminDashboardController.getMostPopularMovies);
router.get('/user-activity-insights', authenticate, adminRoleCheck, adminDashboardController.getUserActivityInsights);
router.get('/trending-genres', authenticate, adminRoleCheck, adminDashboardController.getTrendingGenres);
router.get('/most-searched-actors', authenticate, adminRoleCheck, adminDashboardController.getMostSearchedActors);
router.get('/dashboard-stats', authenticate, adminRoleCheck, adminDashboardController.getAdminDashboardStats);

module.exports = router;