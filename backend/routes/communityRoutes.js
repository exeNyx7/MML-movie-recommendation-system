const express = require('express');
const router = express.Router();
const {
    createDiscussion,
    getDiscussions,
    getDiscussionById,
    addComment,
    deleteDiscussion,
    getTopDiscussed,
    getTopCommentedMovie
} = require('../controllers/communityController');
const authenticate = require('../middlewares/authMiddleware');

// Community discussion routes
router.post('/', authenticate, createDiscussion); // Create a discussion
router.get('/', getDiscussions); // Get all discussions

// New routes
router.get('/top-discussed', getTopDiscussed); // Get the top discussed topic

router.get('/:id', getDiscussionById); // Get a specific discussion
router.post('/:id/comments', authenticate, addComment); // Add a comment
router.delete('/:id', authenticate, deleteDiscussion); // Delete a discussion

module.exports = router;
