const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const communitySchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, enum: ['Genre', 'Actor', 'Movie'], required: true },
    referenceId: { type: Schema.Types.ObjectId, refPath: 'category' }, // Links to Actor, Movie, or Genre
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [commentSchema], // Array of comments
    commentCount: { type: Number, default: 0 }, // Tracks the number of comments in the discussion
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Community', communitySchema);
