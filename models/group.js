const mongoose = require('mongoose')
const groupSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    users: Array,
    admin: String,
    org: String
});

// Create and export the groupModel 
const groupModel = mongoose.model('group', groupSchema);

module.exports = groupModel;