const List = require('../models/List');

// Create a new list
exports.createList = async (req, res) => {
    const { name, description, movies, userId } = req.body;
    try {
        const list = new List({
            name,
            description,
            movies,
            createdBy: userId
        });
        await list.save();
        res.status(201).json(list);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a list
exports.updateList = async (req, res) => {
    const { listId } = req.params;
    const { name, description, movies } = req.body;
    const userId = req.body.userId;  // Assuming userId is passed in the request body

    try {
        const list = await List.findOneAndUpdate(
            { _id: listId, createdBy: userId },
            { name, description, movies },
            { new: true }
        );
        if (!list) {
            return res.status(404).json({ message: "List not found or user not authorized to update this list." });
        }
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a list
exports.deleteList = async (req, res) => {
    const { listId } = req.params;
    const userId = req.body.userId;  // Assuming userId is passed in the request body

    try {
        const list = await List.findOneAndDelete({ _id: listId, createdBy: userId });
        if (!list) {
            return res.status(404).json({ message: "List not found or user not authorized to delete this list." });
        }
        res.status(200).json({ message: "List deleted successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a list by ID
exports.getList = async (req, res) => {
    const { listId } = req.params;

    try {
        const list = await List.findById(listId).populate('movies');
        if (!list) {
            return res.status(404).json({ message: "List not found." });
        }
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Allow a user to follow a list
exports.followList = async (req, res) => {
    const { listId } = req.params;
    const userId = req.body.userId;  // Assuming userId is passed in the request body

    try {
        const list = await List.findById(listId);
        if (!list.followers.includes(userId)) {
            list.followers.push(userId);
            await list.save();
            res.status(200).json({ message: "Successfully followed the list." });
        } else {
            res.status(409).json({ message: "User already follows this list." });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Allows a user to unfollow a previously followed list
exports.unfollowList = async (req, res) => {
    const { listId } = req.params;
    const userId = req.body.userId;  // Assuming userId is passed in the request body

    try {
        const list = await List.findById(listId);
        if (list.followers.includes(userId)) {
            list.followers = list.followers.filter(id => id.toString() !== userId);
            await list.save();
            res.status(200).json({ message: "Successfully unfollowed the list." });
        } else {
            res.status(404).json({ message: "User does not follow this list." });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all lists for a specific user
exports.getListsByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const lists = await List.find({ createdBy: userId });
        res.status(200).json(lists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Displays all lists for all users
exports.getAllLists = async (req, res) => {
    try {
        const lists = await List.find({}).populate('createdBy', 'username').populate('movies');
        res.status(200).json(lists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
