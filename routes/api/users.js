require('dotenv').config();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Get all Users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.send(users);
});



// Get a User
router.get('/:username', async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) return res.send('User does not exist');

  try {
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.send('Server error');
  }
});



// Add user to database
router.post('/', async (req, res) => {
  // Get information from the user
  const { username, password } = req.body;

  // Check if the user already exists
  // findOne will return the user or null
  const user = await User.findOne({ username });
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

    // Sign in the user with jwt
    // Step 1: create a payload with user id
    const payload = {
      user: {
        id: user.id
      }
    };
    // Step 2: create a .sign
    jwt.sign(
      payload, // payload
      process.env.JWT_SECRET, // secret
      { expiresIn: "2 days" }, // options
      (err, token) => { // accepts a callback for async
        if (err) throw error;
        res.send({ token }); // saved within browser header as 'x-auth-token'
      }
    )

    res.send('User created');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});


// Delete a user
// In the future, this will be used with jwt token
// And will find the user by the signed in user id
router.delete('/:username', async (req, res) => {
  const { username } = req.params;
  console.log(username)
  // see if the user exists
  const user = await User.findOne({ username });
  if (!user) return res.send('No user found');

  try {
    await User.deleteOne({ username });
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error(error.message);
    res.send('Server error');
  }
});




module.exports = router;