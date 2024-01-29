const User = require('../../models/user');

const getUserByUserId = async (req, res) => {
  const { id } = req.user;
  
  try {
    
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    return res.json({
      success: true,
      user,
    });

  } catch (error) {
      
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    
  }
}

module.exports = getUserByUserId;