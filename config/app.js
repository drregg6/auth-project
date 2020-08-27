const express = require('express');
const app = express();

// import DB and run
const connectDb = require('./db');
connectDb();

// Middleware and setup

app.use(express.json({ extended: false }))

// get routes
app.use(`/api/users`, require(`../routes/api/users.js`));

module.exports = app;