const User = require("../../models/user");

const loginUser = async (req, res) => {
  const { email, contactNo, password } = req.body;
  try {
    const user = await User.findOne({ $or: [{ email }, { contactNo }] });

    if (!user) {

      return res.status(404).json({
        success: false,
        error: 'User not found'
      });

    } else {

      if (user.deleted) {
        return res.status(400).json({
          success: false,
          error: 'User deleted'
        });
      }

      // Check if password matches
      if (password !== user.password) {
        return res.status(400).json({
          success: false,
          error: 'Invalid credentials'
        });
      }

      // Get a token
      const token = tokenBuilder(user);

      // return the token
      return res.status(200).json({
        success: true,
        token
      });
    }

  } catch (error) {

    return res.status(500).json({ success: false, error: 'Server error' });

  }
};

module.exports = loginUser;