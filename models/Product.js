const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    disease_name: { type: String, required: true },
    product_name: { type: String, required: true },
    product_description: { type: String, required: true },
    product_url: { type: String, required: true },
    price: Number
});

module.exports = mongoose.model('Product', ProductSchema);
