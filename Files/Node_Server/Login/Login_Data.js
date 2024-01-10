const express = require('express');
const connectDB = require('../Database/DbConnection');
const registerRouter = require('./Register');
const loginRouter = require('./Login');
const confirmRouter = require('./Confirm');
const mailRouter = require('./Mail');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors())

app.use(registerRouter);
app.use(loginRouter);
app.use(confirmRouter);
app.use(mailRouter);

connectDB();

app.listen(port, () => {
    console.log('Server is running on port', port);
});
