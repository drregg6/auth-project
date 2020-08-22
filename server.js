const express = require('express');
const app = express();

// import DB and run
const connectDb = require('./config/db');
connectDb();

const PORT = process.env.PORT || 3000;

// get routes
app.use(`/api/users`, require(`./routes/api/users.js`));

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
})