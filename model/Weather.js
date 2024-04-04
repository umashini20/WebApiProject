const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
    district: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    airPressure: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('Weather', weatherSchema);