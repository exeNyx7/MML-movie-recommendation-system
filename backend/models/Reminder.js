const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reminderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    movie: { type: Schema.Types.ObjectId, ref: 'Movie' },
    trailer: { type: Schema.Types.ObjectId, ref: 'Trailer' },
    notificationSent: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

// Optimized indexes for better query performance
reminderSchema.index({ user: 1, createdAt: -1 }); // For user reminders sorted by date
reminderSchema.index({ movie: 1, notificationSent: 1 }); // For movie reminder notifications
reminderSchema.index({ trailer: 1, notificationSent: 1 }); // For trailer reminder notifications
reminderSchema.index({ notificationSent: 1, createdAt: -1 }); // For pending notifications
reminderSchema.index({ user: 1, movie: 1 }, { unique: true, sparse: true }); // Ensure one reminder per user per movie
reminderSchema.index({ user: 1, trailer: 1 }, { unique: true, sparse: true }); // Ensure one reminder per user per trailer

module.exports = mongoose.model('Reminder', reminderSchema);
