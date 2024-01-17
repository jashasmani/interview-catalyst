const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/login.model');

async function getRegisterData(req, res) {

    try {
        const { username,email, password  } = req.body;
      
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username,email, password: hashedPassword });

        await user.save();

        res.status(201).json({ message: 'Sign Up Successful' });
    }
    catch (e) {
        res.status(500).json({ message: 'Internal Server Error' });
        console.error('Registration Error:', e);
    }

}
module.exports = getRegisterData;