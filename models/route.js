// ./models/route.js

const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    org: {
        type: String,
        required: true,
    },
    stop: [{
        id: String,
        name: String,
        sequence: Number,
        longitude: Number,
        latitude: Number,
        reached: {
            type: Boolean,
            default: false
        }
    }],

});
// Create and export the routeModel
const routeModel = mongoose.model('route', routeSchema);

module.exports = routeModel;
