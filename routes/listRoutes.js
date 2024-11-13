const express = require('express');
const router = express.Router();
const {
    createList,
    updateList,
    deleteList,
    getList,
    followList,
    unfollowList,
    getListsByUser,
    getAllLists
} = require('../controllers/listController');

// Create a new custom list
router.post('/', createList);

// Update an existing custom list
router.put('/:listId', updateList);

// Delete a custom list
router.delete('/:listId', deleteList);

// Get details of a specific custom list
router.get('/:listId', getList);

// Follow a custom list
router.post('/follow/:listId', followList);

// Unfollow a custom list
router.post('/unfollow/:listId', unfollowList);

// Get all lists created by a specific user
router.get('/user/:userId', getListsByUser);

// Get all custom lists
router.get('/', getAllLists); // Route to get all lists


module.exports = router;
