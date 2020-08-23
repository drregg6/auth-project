const User = require('../../models/User');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Get all Users
router.get('/', async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.send('hello world');
});



// Get a User
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(id);
});



// Add user to database
router.post('/', async (req, res) => {
  // Get information from the user
  const { username, password } = req.body;

  // Check if the user already exists
  // findOne will return the user or null
  const user = await User.findOne({ username });
  console.log(user);
  if (user) {
    return res.send('User already exists. Please sign in.');
  }
  
  // Create a new user to be saved into the database
  const newUser = new User({
    username,
    password
  });

  // Crypt the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  newUser.password = hash;

  try {
    await newUser.save();
    res.send('User created');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});




module.exports = router;