const express = require('express');
const router = express.Router();
const {
    createDirector,
    getDirectors,
    getDirectorById,
    updateDirector,
    deleteDirector
} = require('../controllers/directorController');
const authenticate = require('../middlewares/authMiddleware');
const adminRoleCheck = require('../middlewares/roleCheck');

// Routes for managing directors
router.post('/', authenticate, adminRoleCheck, createDirector); // Create a new director (Admin only)
router.get('/', getDirectors); // Get all directors with optional pagination
router.get('/:id', getDirectorById); // Get a specific director by ID
router.put('/:id', authenticate, adminRoleCheck, updateDirector); // Update a director (Admin only)
router.delete('/:id', authenticate, adminRoleCheck, deleteDirector); // Delete a director (Admin only)

module.exports = router;
