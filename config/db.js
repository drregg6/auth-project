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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

module.exports = connectDb;