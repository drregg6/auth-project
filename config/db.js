require('dotenv').config();
const mongoose = require(`mongoose`);
const db = process.env.LOCAL_DB;

// Configure MongoDB
const connectDb = async () => {
  try {
    mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = connectDb;