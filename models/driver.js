// ./models/driver.js
const mongoose = require('mongoose');

// Define the schema for the driver
const driverSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    org: {
        type: String,
        required: true,
    },
    vehicleNo: {
        type: String,
    },
    stop: {
        type: String
    },
    routeId: {
        type: String,
        unique: true
    }

});

// Create and export the DriverModel
const DriverModel = mongoose.model('Driver', driverSchema);

module.exports = DriverModel;
