const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    movie: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }, // Rating between 1 and 5
    reviewText: { type: String, required: true },
    highlights: [String]  // Additional detail for notable reviews
}, { timestamps: true });

// Optimized indexes for better query performance
reviewSchema.index({ movie: 1, createdAt: -1 }); // For movie reviews sorted by date
reviewSchema.index({ user: 1, createdAt: -1 }); // For user reviews sorted by date
reviewSchema.index({ rating: -1 }); // For rating-based queries
reviewSchema.index({ movie: 1, rating: -1 }); // For movie rating aggregation
reviewSchema.index({ user: 1, movie: 1 }, { unique: true }); // Ensure one review per user per movie

module.exports = mongoose.model('Review', reviewSchema);
