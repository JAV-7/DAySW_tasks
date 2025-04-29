const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    price: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    category: { type: String, required: true }

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
