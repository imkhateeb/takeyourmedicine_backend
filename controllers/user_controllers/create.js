const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const tokenBuilder = require('../../utils/token_builder');
dotenv.config();


const createUser = async (req, res) => {
  const { name, email, password, role, contactNo } = req.body;

  try {
    // check if user already exists
    let user = await User.findOne({
      $or: [
        { email },
        { contactNo }
      ]
    });

    if (user) {
      return res.status(400).json({ 
        success: false,
        deleted: user.deleted, 
        error: 'User already exists' });
    }

    // create a new user
    user = new User({
      name,
      email,
      contactNo,
      password,
      role
    });

    // encrypt the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // save the user to the database
    await user.save();

    // getting the token
    const token = tokenBuilder(user);

    // return the token
    return res.status(200).json({ success: true, token });

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = createUser;