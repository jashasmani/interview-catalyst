const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/login.model');

async function getUserData(req, res) {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            $or: [
                { email: email },
                { username: email }
            ]});


            console.log(req.body)

        const passwordMatch = await bcrypt.compare(password, user.password);


        if (user && passwordMatch) {
            res.json({ message: 'Login successful' });
        }
        else {
            res.status(401).json({ message: 'Invalid credentials' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }

}
module.exports = getUserData;
