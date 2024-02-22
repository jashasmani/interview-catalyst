const express = require('express');
const bcryptjs = require('bcryptjs');
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
        
        const passwordMatch = await bcryptjs.compare(password, user.password);

        if (passwordMatch) {
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.TOKEN1, { expiresIn: '10h' });

            
            user.tokens = token;
            await user.save();

            res.json({ message: 'Login successful', token: token,username:user.username });
        }
        else {
            res.status(401).json({ message: 'Invalid credentials' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }

}
module.exports = getUserData;
