const User = require('../../models/user');

const getAllCaretakers = async (req, res) => {
  try {
    
    const caretakers = await User.find({ role: 'caretaker' });

    return res.json({
      success: true,
      caretakers,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
    
  }
}

module.exports = getAllCaretakers;