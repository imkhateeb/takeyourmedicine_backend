const User = require("../../models/user");

const updateUser = async (req, res) => {
  const { id } = req.user;
  const {
    name,
    email,
    contactNo,
    password
  } = req.body;

  try {

    const updatedUser = await User.findByIdAndUpdate(id, {
      name: name !== undefined ? name : req.user.name,
      email: email !== undefined ? email : req.user.email,
      contactNo: contactNo !== undefined ? contactNo : req.user.contactNo,
      password: password !== undefined ? password : req.user.password,
    }, { new: true });

    // get a token
    const token = tokenBuilder(updatedUser);

    // return the token
    return res.status(200).json({ success: true, token });

  } catch (error) {
      
      return res.status(500).json({ success: false, error: 'Server error' });
  }


};

module.exports = updateUser;