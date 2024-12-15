const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    feedback_text: { type: String, required: true },
    rating: { type: Number, required: true },
    submitted_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
