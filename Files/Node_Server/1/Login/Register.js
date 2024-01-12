const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../Database/Login_Schema'); 

const router = express.Router();

router.post('/register', async (req, resp) => {
    
        try {
            const { username,email, password  } = req.body;
    
            
    
          
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const user = new User({ username,email, password: hashedPassword });
    
            await user.save();
    
            resp.status(201).json({ message: 'Registration successful' });
        }
        catch (e) {
            resp.status(500).json({ message: 'Internal Server Error' });
            console.error('Registration Error:', e);
        }
    })
    
    

module.exports = router;
