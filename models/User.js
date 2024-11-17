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
}
,
    token: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
