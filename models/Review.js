const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    movie: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true },
    reviewText: { type: String, required: true },
    highlights: [String]  // Additional detail for notable reviews
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
