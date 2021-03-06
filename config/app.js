const path = require('path');
const express = require('express');
const app = express();

// import DB and run
const connectDb = require('./db');
connectDb();

// Middleware and setup

app.use(express.json({ extended: false }))

// get routes
app.use(`/api/users`, require(`../routes/api/users`));
app.use(`/api/auth`, require('../routes/api/auth'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

module.exports = app;