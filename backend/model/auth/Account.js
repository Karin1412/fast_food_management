const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        Staff: {
            type: Number,
            default: 2
        },
        Admin: Number
    },
    refreshToken: String
});

module.exports = mongoose.model('Account', accountSchema);