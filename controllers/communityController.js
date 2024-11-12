const Discussion = require('../models/Discussion');
const Comment = require('../models/Comment');

// Function to create a discussion
exports.createDiscussion = async (req, res) => {
    try {
        const discussion = new Discussion({
            title: req.body.title,
            content: req.body.content,
            user: req.user._id  // assuming user ID is available in req.user from auth middleware
        });
        await discussion.save();
        res.status(201).json(discussion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to update a discussion
exports.updateDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found' });
        }
        res.status(200).json(discussion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to delete a discussion
exports.deleteDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findByIdAndDelete(req.params.id);
        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found' });
        }
        res.status(200).json({ message: 'Discussion deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to list discussions
exports.listDiscussions = async (req, res) => {
    try {
        const discussions = await Discussion.find();
        res.status(200).json(discussions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to add a comment
exports.addComment = async (req, res) => {
    try {
        const comment = new Comment({
            content: req.body.content,
            user: req.user._id,
            discussion: req.params.discussionId
        });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to delete a comment
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
