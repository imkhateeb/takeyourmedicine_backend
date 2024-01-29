const User = require('../../models/user');
const AIchats = require('../../models/AIchats');

const deleteChat = async (req, res) => {
  const { id } = req.user;
  const { chatId } = req.params;

  try {
    const deletedChat = await AIchats.findByIdAndDelete(chatId);
    const user = await User.findById(id);
    const chats = user.chats.filter(chat => chat.id !== chatId);
    user.chats = chats;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Chat deleted successfully',
      data: deletedChat,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: 'Unable to delete chat',
    });

  }
}

module.exports = deleteChat;