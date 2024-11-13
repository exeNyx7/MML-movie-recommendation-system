const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('List', listSchema);
