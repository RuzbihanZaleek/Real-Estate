const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});