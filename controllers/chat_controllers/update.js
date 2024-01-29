const AIchats = require('../../models/AIchats');

const updateChat = async (req, res) => {
  const { chatId } = req.params;

  try {
    const chat = await AIchats.findById(chatId);
    chat.content.push(req.body.content ? req.body.content : chat.content);
    chat.title = req.body.title ? req.body.title : chat.title;
    chat.lastModified = Date.now();
    await chat.save();

    return res.status(200).json({
      success: true,
      message: 'Chat updated successfully',
      data: chat,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: 'Unable to update chat',
    });
    
  }

}

module.exports = updateChat;