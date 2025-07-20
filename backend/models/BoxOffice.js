const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boxOfficeSchema = new Schema({
    movie: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
    openingWeekend: { type: Number, required: true }, // Revenue in USD
    totalEarnings: { type: Number, required: true },
    internationalRevenue: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('BoxOffice', boxOfficeSchema);
