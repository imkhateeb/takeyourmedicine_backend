const User = require('../../models/user');

const getAllChats = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id);
    const chats = user.chats;

    return res.status(200).json({
      success: true,
      message: 'Chats retrieved successfully',
      data: chats,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: 'Unable to retrieve chats',
    });
    
  }

}