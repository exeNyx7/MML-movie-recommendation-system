const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: { type: String, required: true },
    genre: { type: [String], required: true },
    director: { type: String, required: true },
    cast: [{ type: String }],
    releaseDate: { type: Date },
    runtime: { type: Number }, // in minutes
    synopsis: { type: String },
    averageRating: { type: Number },
    movieCover: { type: String },
    trivia: [String],
    goofs: [String],
    soundtrackInfo: [String],
    ageRating: { type: String },
    parentalGuidance: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
