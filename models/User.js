const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    preferences: {
        genres: [String],
        actors: [String]
    },
    token: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
