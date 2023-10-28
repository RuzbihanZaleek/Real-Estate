const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.route');

mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
