const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    breed: { type: String, required: true},
    species: {
             type: String,
             required: true,
             enum: [ 'dog', 'cat', 'other' ]
    },
    place: { type: String, required: true},
    date: { type: Date, default: Date.now}
}, { timestamps: true });

module.exports = mongoose.model('Pet', PetSchema);