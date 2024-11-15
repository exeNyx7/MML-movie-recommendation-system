const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trailerSchema = new Schema({
    movie: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
    trailerNumber: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String },
    releaseDate: { type: Date, required: true },
    url: { type: String, required: true },
    aired: { type: Boolean, default: false, required: true }
});

module.exports = mongoose.model('Trailer', trailerSchema);
