const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
}, { timestamps: true });

// Optimized indexes for better query performance
wishlistSchema.index({ user: 1 }, { unique: true }); // Ensure one wishlist per user
wishlistSchema.index({ movies: 1 }); // For movie-based wishlist queries
wishlistSchema.index({ user: 1, updatedAt: -1 }); // For recent wishlist updates

module.exports = mongoose.model('Wishlist', wishlistSchema);
