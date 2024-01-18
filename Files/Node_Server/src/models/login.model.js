const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');



// User-login
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
    },
    tokens: [{
        token: {
            type: String,
            required: false
        }
    }]
})

UserSchema.methods.generateAuthToken = async function () {
    try {
        console.log(this._id);
        const token = jwt.sign({ _id: this._id.to.String() }, "asmanijashvimalbhaihashmukhbhaiasmani")
        this.tokens = this.tokens.concat({ token: token })
        console.log(this.token);
        await this.save();
        return token;

    } catch (error) {
        console.log(error)
    };

}


const User = mongoose.model('User', UserSchema);


module.exports ={ User};