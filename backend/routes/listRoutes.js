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
const authenticate = require('../middlewares/authMiddleware');
const adminRoleCheck = require('../middlewares/roleCheck');


router.post('/', createList); // Create a new custom list

// TRY TO ADD ADMIN TO IT: (authenticate that only admin or creator can update or delete a list)
router.put('/:listId', updateList); // Update an existing custom list
router.delete('/:listId', deleteList); // Delete a custom list

router.get('/:listId', getList); // Get details of a specific custom list

router.post('/follow/:listId', followList); // Follow a custom list
router.post('/unfollow/:listId', unfollowList); // Unfollow a custom list


router.get('/user/:userId', getListsByUser); // Get all lists created by a specific user
router.get('/', getAllLists); // Get all custom lists


module.exports = router;
