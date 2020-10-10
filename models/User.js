const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  bio: {
    type: String,
    default: 'Hello world! I am a default user, thank you for visiting me!'
  }
});

module.exports = User = mongoose.model('User', userSchema);