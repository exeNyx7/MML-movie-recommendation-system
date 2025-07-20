const express = require('express');
const router = express.Router();
const {
    createActor,
    getActors,
    getActorById,
    updateActor,
    deleteActor
} = require('../controllers/actorController');
const authenticate = require('../middlewares/authMiddleware');
const adminRoleCheck = require('../middlewares/roleCheck');

// Routes for managing actors
router.post('/', authenticate, adminRoleCheck, createActor); // Create a new actor (Admin only)
router.get('/', getActors); // Get all actors with optional pagination
router.get('/:id', getActorById); // Get a specific actor by ID
router.put('/:id', authenticate, adminRoleCheck, updateActor); // Update an actor (Admin only)
router.delete('/:id', authenticate, adminRoleCheck, deleteActor); // Delete an actor (Admin only)

module.exports = router;
