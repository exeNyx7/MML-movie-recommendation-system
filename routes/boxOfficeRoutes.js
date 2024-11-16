const express = require('express');
const router = express.Router();
const {
    createBoxOffice,
    getBoxOfficeByMovie,
    getAllBoxOffice,
    updateBoxOffice,
    deleteBoxOffice
} = require('../controllers/boxOfficeController');
const authenticate = require('../middlewares/authMiddleware');
const adminRoleCheck = require('../middlewares/roleCheck');

// Routes for managing box office data
router.post('/', authenticate, adminRoleCheck, createBoxOffice); // Admin-only: Create box office data for a movie
router.get('/', getAllBoxOffice); // Public: Get all box office data with pagination
router.get('/movie/:movieId', getBoxOfficeByMovie); // Public: Get box office data for a specific movie
router.put('/:id', authenticate, adminRoleCheck, updateBoxOffice); // Admin-only: Update box office data
router.delete('/:id', authenticate, adminRoleCheck, deleteBoxOffice); // Admin-only: Delete box office data

module.exports = router;
