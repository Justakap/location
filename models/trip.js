const mongoose = require('mongoose')
const tripSchema = new mongoose.Schema({
    tripCode:
    {
        type: String,
        required: true
    },
    owner:
    {
        type: String,
        required: true
    },
    org:
    {
        type: String,
        required: true
    },
    vehicleId:
    {
        type: String,
    },
    startedAt: {
        type: Date,
        default: Date.now
    },
    endedAt: {
        type: Date,
    },
    currentStatus:
    {
        type: Boolean,
        default: true
    },
    routeId: {
        type: String,
    },
    stop: [{
        id: String,
        name: String,
        sequence: Number,
        lat: Number,
        long: Number,
        reached: {
            type: Boolean,
            default: false
        },
        arrivalTime:{
            type: Date,
            default: Date.now()
        }

    }],

});

// Create and export the tripModel 
const tripModel = mongoose.model('trip', tripSchema);

module.exports = tripModel;