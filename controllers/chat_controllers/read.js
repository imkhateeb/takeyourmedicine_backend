const AIchats = require('../../models/AIchats');

const getChat = async (req, res) => {
  const { chatId } = req.params;

  try {
    const chat = await AIchats.findById(chatId);

    return res.status(200).json({
      success: true,
      message: 'Chat retrieved successfully',
      data: chat,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: 'Unable to retrieve chat',
    });
    
  }
}

module.exports = getChat;