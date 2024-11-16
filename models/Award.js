const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const awardSchema = new Schema({
    name: { type: String, required: true },
    year: { type: Number, required: true },
    category: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Award', awardSchema);
