const express = require('express');
const connectDB = require('./DbConnection');
const loginRouter = require('./routes/login.route');
const questionRouter = require('./routes/question.route');
const profileRouter = require('./routes/profile.route');
const commentRouter = require('./routes/comments.route');
const likeRouter = require('./routes/like.route');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors())

app.use('/user',loginRouter);
app.use('/user',questionRouter);
app.use('/user',profileRouter);
app.use('/user',commentRouter);
app.use('/user',likeRouter);

connectDB();

app.listen(port, () => {
    console.log('Server is running on port', port);
});
