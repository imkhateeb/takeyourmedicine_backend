// const User = require('../models/user');
const Medicine = require('../models/medicine');

// const sendMail = require('../utils/send_mail');

const completeSchedule = async (req, res) => {
  // const { id } = req.user;
  const { requestId } = req.params;

  try {
    // const user = await User.findById(id);
    const schedule = await Medicine.findById(requestId);

    if (!schedule) {
      return res.status(404).json({
        success: false,
        error: 'Schedule not found'
      });
    }
    schedule.courseStatus = 'completed';
    await schedule.save();

    // const message = `Hello ${user.name}, congratulations! on completing the medication course`;

    // sendMail(user.email, 'Medication course completed', message);

    return res.json({
      success: true,
      message: 'Schedule completed'
    });
  } catch (error) {

    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });

  }
}

module.exports = completeSchedule;