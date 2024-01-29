const dotenv = require('dotenv');
dotenv.config();

const jwt = require('jsonwebtoken');

const User = require('../../models/user');

const checkCaretakerMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized'
    });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = User.findById(decoded.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    if (user.deleted) {
      return res.status(400).json({
        success: false,
        deleted: user.deleted,
        error: 'User deleted'
      });
    }


    if (user.role !== 'caretaker') {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    req.user = user;

    // Proceed to the next middleware
    next();
  } catch (err) {
    return res.status(401).json({
      error: 'Invalid token'
    });
  }
};

module.exports = checkCaretakerMiddleware;