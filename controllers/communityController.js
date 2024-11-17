const mongoose = require('mongoose');
const Community = require('../models/Community');

// Create a new discussion
exports.createDiscussion = async (req, res) => {
    try {
        const { title, category, referenceId } = req.body;
        const discussion = new Community({
            title,
            category,
            referenceId,
            creator: req.user.user_id
        });
        await discussion.save();
        res.status(201).json(discussion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all discussions with optional filters
exports.getDiscussions = async (req, res) => {
    const { category, referenceId, page = 1, limit = 10 } = req.query;
    try {
        const query = {};
        if (category) query.category = category;
        if (referenceId) query.referenceId = referenceId;

        const discussions = await Community.find(query)
            .populate('creator', 'username')
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        const total = await Community.countDocuments(query);

        res.status(200).json({
            totalItems: total,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page),
            discussions
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific discussion by ID
exports.getDiscussionById = async (req, res) => {
    try {
        const discussion = await Community.findById(req.params.id)
            .populate('creator', 'username')
            .populate('comments.user', 'username');
        if (!discussion) return res.status(404).json({ message: 'Discussion not found' });
        res.status(200).json(discussion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a comment to a discussion
exports.addComment = async (req, res) => {
    try {
        const discussion = await Community.findById(req.params.id);
        if (!discussion) return res.status(404).json({ message: 'Discussion not found' });

        const comment = {
            user: req.user.user_id,
            text: req.body.text
        };
        discussion.comments.push(comment);
        discussion.commentCount += 1; // Increment the comment count
        await discussion.save();
        res.status(200).json(discussion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a discussion
exports.deleteDiscussion = async (req, res) => {
    try {
        const discussion = await Community.findById(req.params.id);
        if (!discussion) return res.status(404).json({ message: 'Discussion not found' });

        // Only the creator or an admin can delete the discussion
        if (discussion.creator.toString() !== req.user.user_id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You do not have permission to delete this discussion' });
        }

        await Community.deleteOne({ _id: req.params.id }); // Corrected method
        res.status(200).json({ message: 'Discussion deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTopDiscussed = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const topDiscussed = await Community.aggregate([
            { $unwind: "$comments" },
            { $group: { _id: "$_id", title: { $first: "$title" }, category: { $first: "$category" }, referenceId: { $first: "$referenceId" }, commentCount: { $sum: 1 } } },
            { $sort: { commentCount: -1 } }, // Sort by comment count descending
            { $skip: (page - 1) * limit },
            { $limit: parseInt(limit) }
        ]);

        if (!topDiscussed.length) {
            return res.status(404).json({ message: 'No discussions found' });
        }

        // Populate additional details based on category
        for (let discussion of topDiscussed) {
            if (discussion.category === 'Movie') {
                discussion.details = await mongoose.model('Movie').findById(discussion.referenceId).select('title director releaseDate');
            } else if (discussion.category === 'Actor') {
                discussion.details = await mongoose.model('Actor').findById(discussion.referenceId).select('name birthDate');
            } else if (discussion.category === 'Genre') {
                const movie = await mongoose.model('Movie').findById(discussion.referenceId).select('title genre');
                discussion.details = { genres: movie.genre, movieTitle: movie.title };
            }
        }

        const total = await Community.countDocuments();

        res.status(200).json({
            totalItems: total,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page),
            topDiscussed
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
