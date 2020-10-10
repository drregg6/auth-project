require('dotenv').config();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Get all Users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});



// Get a User
router.get('/:username', async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ msg: 'User does not exist.' });

  try {
    res.status(200).json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});



// Add user to database
router.post('/', async (req, res) => {
  // Get information from the user
  const { username, bio, password, repeatPassword } = req.body;
  const regTest = /[^0-9a-z]/i;

  // Checks for form entry errors
  if (password !== repeatPassword) return res.status(401).json({ msg: 'Passwords must match.' });
  if (username.length < 4) return res.status(401).json({ msg: 'Username must be at least 4 characters.' });
  if (password.length < 8) return res.status(401).json({ msg: 'Password must be at least 8 characters.' });
  if (username.match(regTest)) return res.status(401).json({ msg: 'Username may only contain letters or numbers.' })
  if (password.match(regTest)) return res.status(401).json({ msg: 'Password may only contain letters or numbers.' })

  // Check if the user already exists
  // findOne will return the user or null
  let user = await User.findOne({ username });
  if (user) return res.status(401).json({ msg: 'Username already exists. Please login.' });
  
  // Create a new user to be saved into the database
  user = new User({
    username,
    password,
    bio
  });

  // Hash the password
  if (user.password !== 'password') { // remove this when testing is complete
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;
  }

  try {
    await user.save();

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
        res.status(201).json({ token }); // saved within browser header as 'x-auth-token'
      }
    )
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});



// Update a user's password
// This route only updates the password
router.put('/update-password', auth, async (req, res) => {
  let { username, password, newPassword, repeatPassword } = req.body;
  if (newPassword !== repeatPassword) return res.status(401).json({ msg: 'Passwords do not match.' });

  try {
    let user = await User.findOne({ username });
    if (!user) return res.status(401).json({ msg: 'User not found.' });

    if (user.password !== 'password') { // remove once testing is complete
      let decodedPass = await bcrypt.compareSync(password, user.password);
      if (!decodedPass) return res.status(401).json({ msg: 'Incorrect password.' });
      let comparedPass = await bcrypt.compare(newPassword, user.password);
      if (comparedPass) return res.status(401).json({ msg: 'Password cannot be the same as old password.' });
    } else {
      if (user.password !== password) return res.status(401).json({ msg: 'Incorrect password.' });
      if (user.password === newPassword) return res.status(401).json({ msg: 'Password cannot be the same as old password.' });
    }

    // hash new password
    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(newPassword, salt);

    if (user.password === newPassword) return res.status(401).json({ msg: 'Password cannot be the same as old password.' });

    user = await User.findOneAndUpdate(
      { username },
      { $set: { password: newPassword } },
      { new: true }
    )
    return res.status(200).json({ msg: 'Password updated.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});


// Update User
// Update either the username or bio
router.put('/update-user', auth, async (req, res) => {
  let { username, bio } = req.body;
  let id = mongoose.Types.ObjectId(req.user.id);
  let updatedUser = {
    id,
    username,
    bio
  };

  try {
    let user = await User.findById( id );
    if (!user) return res.status(401).json({ msg: 'User not found.' });
    let otherUser = await User.findOne({ username: updatedUser.username });
    if (otherUser) return res.status(401).json({ msg: 'Username already exists.' });

    // updatedUser needs to add password
    updatedUser.password = user.password;

    await User.findOneAndUpdate(
      { _id: id },
      { $set: updatedUser },
      { new: true }
    )
    return res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});


// Delete a user
// In the future, this will be used with jwt token
// And will find the user by the signed in user id
router.delete('/:username', auth, async (req, res) => {
  const { username } = req.params;
  // see if the user exists
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ msg: 'No user found.' });

  try {
    await User.deleteOne({ username });
    const users = await User.find();
    res.status(200).json( users );
  } catch (error) {
    console.error(error.message);
    res.send('Server error');
  }
});




module.exports = router;