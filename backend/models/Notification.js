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
});

module.exports = mongoose.model('Notification', notificationSchema);
