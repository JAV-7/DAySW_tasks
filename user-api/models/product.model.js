const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    sku: { type: String }

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
