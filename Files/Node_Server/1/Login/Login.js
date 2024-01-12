const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../Database/Login_Schema');

const router = express.Router();

router.post('/login', async (req, resp) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return resp.status(400).json({ message: 'Invalid Username or Password' });

        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return resp.status(400).json({ message: 'Invalid Username or Password' });

        }


        resp.status(200).json({ message: 'Login successful' });
    }
    catch (e) {
        resp.status(500).json({ message: 'login Error' });
    }
});
module.exports = router;
