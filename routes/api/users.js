const express = require('express');
const router = express.Router();
const User = require('../../models/User');

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
  console.log(req.body);
  const { username, password } = req.body;
  
  // Create a new user to be saved into the database
  const newUser = new User({
    username,
    password
  });

  try {
    await newUser.save();
    res.send('User created');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});




module.exports = router;