const mongoose = require('mongoose')
const roomSchema = new mongoose.Schema({
    roomCode:
    {
        type: String,
        required: true
    },
    owner:
    {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    currentStatus:
    {
        type: Boolean,
        default: true
    }
    
});

// Create and export the roomModel 
const roomModel = mongoose.model('room', roomSchema);

module.exports = roomModel;