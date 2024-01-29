const AIchats = require('../../models/AIchats');
const User = require('../../models/user');

const createChat = async (req, res) => {
  const { id } = req.user;
  try {
    const newChat = new AIchats(req.body);
    const user = await User.findById(id);

    user.chats.push({title: newChat.title, id: newChat._id});
    await user.save();
    await newChat.save();

    return res.status(201).json({
      success: true,
      message: 'Chat created successfully',
      data: newChat,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: 'Unable to create chat',
    });
    
  }
}

module.exports = createChat;