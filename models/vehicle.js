// ./models/vehicle.js

const mongoose = require('mongoose');

// Define the schema for the vehicle
const vehicleSchema = new mongoose.Schema({
    vehicleNo:{
        type:String,
        required: true,
        unique:true
    },
    
    name:{
        type:String,
        required: true,
    },
    org:{
        type:String,
        required: true,
    },

    
    
});

// Create and export the vehicleModel
const vehicleModel = mongoose.model('vehicle', vehicleSchema);

module.exports = vehicleModel;
