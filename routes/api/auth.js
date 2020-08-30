const User = require('../../models/User');
const express = require('express');
const router = express.Router();

// Login user
router.get('/', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    // if (user)
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error.' });
  }
});

module.exports = router;