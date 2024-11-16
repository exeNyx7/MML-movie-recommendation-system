const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, enum: ['Movies', 'Actors', 'Industry'], required: true },
    associatedMovies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }], // Links to movies
    associatedActors: [{ type: String }], // Names of associated actors
    publicationDate: { type: Date, default: Date.now },
    author: { type: String, default: 'Admin' },
    images: [{ type: String }], // URLs for images or media
    status: { type: String, enum: ['Published', 'Draft'], default: 'Published' },
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema);
