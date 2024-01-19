const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/login.model');
const jwt = require('jsonwebtoken');

async function getUserData(req, res) {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            $or: [
                { email: email },
                { username: email }
            ]
        });


        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const token = jwt.sign({ id: user._id, email: user.email }, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', { expiresIn: '1h' });

            
            user.tokens = token;
            await user.save();

            res.json({ message: 'Login successful', token: token });
        }
        else {
            res.status(401).json({ message: 'Invalid credentials' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }

}
module.exports = getUserData;
