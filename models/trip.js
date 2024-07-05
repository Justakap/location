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
    }

});

// Create and export the tripModel 
const tripModel = mongoose.model('trip', tripSchema);

module.exports = tripModel;