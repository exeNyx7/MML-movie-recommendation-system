const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    link: { type: String, required: true },
    read: { type: Boolean, default: false },
    notificationType: { type: String, enum: ['Movie', 'Trailer'], required: true },
    contentId: { type: Schema.Types.ObjectId, required: true, refPath: 'notificationType' },
    sent: { type: Boolean, default: false }
}, { timestamps: true });

// Optimized indexes for better query performance
notificationSchema.index({ user: 1, createdAt: -1 }); // For user notifications sorted by date
notificationSchema.index({ user: 1, read: 1 }); // For unread notifications
notificationSchema.index({ notificationType: 1, contentId: 1 }); // For content-based queries
notificationSchema.index({ sent: 1, createdAt: -1 }); // For pending notifications
notificationSchema.index({ user: 1, notificationType: 1 }); // For type-based user notifications

module.exports = mongoose.model('Notification', notificationSchema);
