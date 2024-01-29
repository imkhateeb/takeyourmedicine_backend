const User = require("../../models/user");


const deleteUser = async (req, res) => {
  const { id } = req.user;

  try {
    const deletedUser = await User.findByIdAndUpdate(id, { deleted: true }, { new: true });

    return res.status(200).json({ success: true, deleteUser });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = deleteUser;