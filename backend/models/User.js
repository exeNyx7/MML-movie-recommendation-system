const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user' }, // 'admin' or 'user'
    preferences: {
        genres: [String], // List of favorite genres
        actors: [String], // List of favorite actors
        directors: [String] // List of favorite directors
    },
    activity: {
        recentlyRatedMovies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }], // Recently rated movies
        watchHistory: [{ type: Schema.Types.ObjectId, ref: 'Movie' }], // Watch history
        logs: [
            {
                action: { type: String }, // e.g., "viewed", "rated", "searched"
                target: { type: Schema.Types.ObjectId, ref: 'Movie' }, // Target movie or object
                timestamp: { type: Date, default: Date.now }
            }
        ]
    },
    token: { type: String }
}, { timestamps: true });

// Optimized indexes for better query performance
userSchema.index({ email: 1 }); // For login queries
userSchema.index({ username: 1 }); // For username lookups
userSchema.index({ role: 1 }); // For admin queries
userSchema.index({ 'preferences.genres': 1 }); // For genre-based recommendations
userSchema.index({ 'preferences.actors': 1 }); // For actor-based recommendations
userSchema.index({ 'preferences.directors': 1 }); // For director-based recommendations
userSchema.index({ createdAt: -1 }); // For sorting by registration date
userSchema.index({ 'activity.logs.timestamp': -1 }); // For activity tracking

module.exports = mongoose.model('User', userSchema);
