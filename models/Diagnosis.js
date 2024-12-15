const mongoose = require('mongoose');

const DiagnosisSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    plant_name: { type: String, required: true },
    disease_name: { type: String, required: true },
    confidence_score: { type: Number, required: true },
    image_data: { type: String, required: true }, // Updated field to store Base64 data
    treatment_recommendations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    diagnosis_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Diagnosis', DiagnosisSchema);
