const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// Dummy user data (for demonstration purposes)
const users = [
    { email: 'asmanijash51@gmail.com', password: 'user1', id: 1 },
    { email: 'asmanijash61@gmail.com', password: 'user2', id: 2 }
];

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'interviewcatalystservice@gmail.com',
        pass: 'vqjn komr vfhp jegp',
    }
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
        const token = jwt.sign({ id: user.id, email: user.email }, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.post('/api/return', verifyT, (req, res) => {

    jwt.verify(req.token, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', async (err, authdata) => {

        if (err) {
            res.status(401).send({ result: "invalid token" });
        }

        else {
           
            try {
                const mailOptions = {
                    from: 'interviewcatalystservice@gmail.com',
                    to: authdata.email,
                    subject: 'Return Notification',
                    text: `User  has return item.`,
                    // text: `User ${userEmail} has purchased .`,
                };

                 transporter.sendMail(mailOptions);
                res.status(200).send('Email sent successfully');
                
            } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
            
        }
    })
})


app.post('/api/buy', verifyT, (req, res) => {

    jwt.verify(req.token, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', async (err, authdata) => {

        if (err) {
            res.status(401).send({ result: "invalid token" });
        }

        else {
           
            try {
                const mailOptions = {
                    from: 'interviewcatalystservice@gmail.com',
                    to: authdata.email,
                    subject: 'Purchase Notification',
                    text: `User  has purchase item.`,
                    // text: `User ${userEmail} has purchased .`,
                };

                 transporter.sendMail(mailOptions);
                res.status(200).send('Email sent successfully');
                
            } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
            
        }
    })
})

function verifyT(req, resp, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        console.log('Received Token:', token);
        req.token = token;
        next();
    }
    else {
        resp.send({
            result: "token is not valid"
        })
    }
}


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
