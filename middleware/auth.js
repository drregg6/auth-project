require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // get a token from header, if available
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token. Authorization denied.' });

  try {
    const decoded = jwt.decode(token, process.env.JWT_SECRET);

    // payload
    // this will now be accessible for private routes
    // and accessed with req.user
    // so to delete a user, get the id with req.user.id
    res.user = decoded.user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ msg: 'Token not valid' });
  }
}