const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reminderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    movie: { type: Schema.Types.ObjectId, ref: 'Movie' },
    trailer: { type: Schema.Types.ObjectId, ref: 'Trailer' },
    notificationSent: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Reminder', reminderSchema);
