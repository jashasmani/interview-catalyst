const express = require('express');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const User = require('../Database/Login_Schema');
const Mail = require('nodemailer/lib/mailer');
const router = express.Router();
router.post('/mail', async (req, resp) => {
    const { mail } = req.body; 

    try {
        const user = await User.findOne({ email: mail });

        if (!user) {
            return resp.status(404).json({ status: true, respMesg: 'User Not Found' });
        }

        const token = jwt.sign({ userId: user._id }, "qwertyuioplkjhgfddsazxcvbnmlkjhgfdaqwertyuuioplkjhg", { expiresIn: '1h' });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'asmanijash61@gmail.com',
                pass: 'jgpj ntrp rgop llmb'
            }
        });

        const mailOptions = {
            from: 'asmanijash61@gmail.com',
            to: mail,
            subject: 'Welcome to NodeJS App',
            html: `
                <div style="padding:10px;border-style: ridge">
                    <p>You have a new request.</p>
                    <h3>Cofirm Password</h3>
                    <ul>
                    <li>Confirm Password: <a href="http://localhost:3000/confirm/${user._id}/${token}">Click here</a></li>
                    </ul>
                </div>
            `
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                resp.json({ status: true, respMesg: 'Email Not Sent Successfully' });
            } else {
                resp.json({ status: false, respMesg: 'Email Sent Successfully' });
            }
        });
    } catch (err) {
        resp.status(500).json({ status: true, respMesg: 'Internal Server Error' });
    }
});




module.exports = router;
