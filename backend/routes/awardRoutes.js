const express = require('express');
const router = express.Router();
const {
    createAward,
    getAwards,
    getAwardById,
    getAwardsByActor,
    getAwardsByMovie,
    updateAward,
    deleteAward
} = require('../controllers/awardController');
const authenticate = require('../middlewares/authMiddleware');
const adminRoleCheck = require('../middlewares/roleCheck');

// Routes for managing awards
router.post('/', authenticate, adminRoleCheck, createAward); // Admin-only: Create a new award
router.get('/', getAwards); // Public: Get all awards with optional filters and pagination
router.get('/:id', getAwardById); // Public: Get a specific award by ID
router.get('/actor/:actorId', getAwardsByActor); // Public: Get all awards won by a specific actor
router.get('/movie/:movieId', getAwardsByMovie); // Public: Get all awards won by a specific movie
router.put('/:id', authenticate, adminRoleCheck, updateAward); // Admin-only: Update an award
router.delete('/:id', authenticate, adminRoleCheck, deleteAward); // Admin-only: Delete an award

module.exports = router;
