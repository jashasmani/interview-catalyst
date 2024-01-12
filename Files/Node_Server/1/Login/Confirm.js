const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Database/Login_Schema'); 

const router = express.Router();

router.post('/confirm/:userId/:token', async (req, resp) => {
    const { userId, token } = req.params;
    const { password, confirm_password } = req.body;
    
    console.log(req.body)
    try {
        
        if (password !== confirm_password) {
            return resp.status(400).json({ message: 'Passwords do not match' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const hashedConfirmPassword = await bcrypt.hash(confirm_password, saltRounds);

       
        const user = await User.findById(userId);
        if (!user) {
            return resp.status(404).json({ message: 'User not found' });
        }

        await jwt.verify(token, "qwertyuioplkjhgfddsazxcvbnmlkjhgfdaqwertyuuioplkjhg", async (err, decoded) => {
            if (err) {
                return resp.status(401).json({ message: 'Invalid or expired token' });
            }

            
                user.password = hashedPassword;
                user.confirm_password = hashedConfirmPassword;

                await user.save();

                resp.json({ message: 'Password confirmed successfully' });
            
        });
    }
    catch (err) {
        resp.status(500).json({ message: "Error" });
    }
});

module.exports = router;
