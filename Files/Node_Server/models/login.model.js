const mongoose = require('mongoose');


// User-login
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: false
    },
    tokens: {
                type: String,
                uniqe: true
        }
    
})


const User = mongoose.model('User', UserSchema);


module.exports = User;