const express = require('express');
const router = express.Router();
const { 
    addTrailer, 
    getTrailer, 
    updateTrailer, 
    deleteTrailer 
} = require('../controllers/trailerController');
const authenticate = require('../middlewares/authMiddleware');
const adminRoleCheck = require('../middlewares/roleCheck');

// router.post('/', addTrailer);
// router.get('/:id', getTrailer);
// router.put('/:id', updateTrailer);
// router.delete('/:id', deleteTrailer);



// // Require authentication for all trailer management routes
router.post('/', authenticate, adminRoleCheck, addTrailer);
router.put('/:id', authenticate, adminRoleCheck, updateTrailer);
router.get('/:id', getTrailer);
router.delete('/:id', authenticate, adminRoleCheck, deleteTrailer);

module.exports = router;
