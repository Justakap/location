// ./models/student.js
const mongoose = require('mongoose');

// Define the schema for the student
const studentSchema = new mongoose.Schema({
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
    emergencyContact: {
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
    }

});

// Create and export the studentModel
const studentModel = mongoose.model('student', studentSchema);

module.exports = studentModel;
