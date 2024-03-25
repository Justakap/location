// ./models/driver.js

const mongoose = require('mongoose');

// Define the schema for the driver
const driverSchema = new mongoose.Schema({
    name: String,
    password: String,
    org: String
});

// Create and export the DriverModel
const DriverModel = mongoose.model('Driver', driverSchema);

module.exports = DriverModel;
