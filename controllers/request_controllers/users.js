const User = require('../../models/user');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    return res.json({
      success: true,
      users,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
    
  }
}

module.exports = getAllUsers;