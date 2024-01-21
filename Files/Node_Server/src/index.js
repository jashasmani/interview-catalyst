const express = require('express');
const connectDB = require('./DbConnection');
const loginRouter = require('./routes/login.route');
const questionRouter = require('./routes/question.route');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors())

app.use('/user',loginRouter);
app.use('/user',questionRouter);

connectDB();

app.listen(port, () => {
    console.log('Server is running on port', port);
});
