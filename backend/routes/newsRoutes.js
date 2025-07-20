const express = require('express');
const router = express.Router();
const {
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
    deleteArticle
} = require('../controllers/newsController');
const authenticate = require('../middlewares/authMiddleware');
const adminRoleCheck = require('../middlewares/roleCheck');

// Routes for news articles
router.post('/', authenticate, adminRoleCheck, createArticle); // Admin-only: Create an article
router.get('/', getArticles); // Public: Get all articles
router.get('/:id', getArticleById); // Public: Get an article by ID
router.put('/:id', authenticate, adminRoleCheck, updateArticle); // Admin-only: Update an article
router.delete('/:id', authenticate, adminRoleCheck, deleteArticle); // Admin-only: Delete an article

module.exports = router;
