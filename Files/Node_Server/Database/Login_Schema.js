const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        uniqe: true
    },
    email: {
        type: String,
        required: true,
        uniqe: true
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: false
    }

})

const User = mongoose.model('User', UserSchema);

module.exports = User;