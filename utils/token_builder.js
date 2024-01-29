const jwt = require('jsonwebtoken');
const tokenBuilder = (user) => {
  // create a payload
  const payload = {
    user: {
      id: user.id,
      role: user.role,
      contactNo: user.contactNo,
      name: user.name,
      email: user.email,
    }
  };

  // create a token
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  return token;
};

module.exports = tokenBuilder;