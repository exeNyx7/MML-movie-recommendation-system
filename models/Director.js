const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const directorSchema = new Schema({
    name: { type: String, required: true },
    biography: { type: String },
    birthDate: { type: Date },
    filmography: [{ type: Schema.Types.ObjectId, ref: 'Movie' }], // List of movies they directed
    awards: [{ type: Schema.Types.ObjectId, ref: 'Award' }], // List of awards they won/nominated
    searchCounter: { type: Number, default: 0 }, // Tracks how many times the director has been searched
    popularity: { type: Number, default: 0 } // Placeholder for future popularity logic
}, { timestamps: true });

module.exports = mongoose.model('Director', directorSchema);
