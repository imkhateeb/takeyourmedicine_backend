const jwt = require('jsonwebtoken');

const secretKey = process.env.EXPRESS_APP_JWT_SECRET_KEY;

const generateToken = (payload) => {
  return jwt.sign(payload, secretKey);
};


const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
