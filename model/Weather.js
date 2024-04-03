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
        type: String,
        required: true
    },
    temperature: {
        type: String,
        required: true
    },
    airPressure: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Weather', weatherSchema);