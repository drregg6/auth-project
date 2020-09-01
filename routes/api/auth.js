require('dotenv').config();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

// Get logged in users id
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.status(200).json(user);
  } catch (error) {
    if (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server error.' });
    }
  }
});

// Login user
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ msg: 'Incorrect credentials. Please try again.' });
    if (user.password !== password) return res.status(401).json({ msg: 'Incorrect credentials. Please try again.' });

    // Get user jwt
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '2 days' },
      (error, token) => {
        if (error) {
          console.error(error.message);
          return res.status(401).json({ msg: 'Something went wrong.' });
        }
        return res.status(200).json({ token });
      }
    )
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error.' });
  }
});

module.exports = router;