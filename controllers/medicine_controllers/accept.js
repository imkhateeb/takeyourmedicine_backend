// Purpose: To accept a schedule request from a caretaker


const User = require('../models/user');
const Medicine = require('../models/medicine');
const Caretaker = require('../models/caretaker');


const acceptSchedule = async (req, res) => {
  const { id } = req.user;
  const { requestId } = req.params;

  try {
    
    const user = await User.findById(id);
    const caretaker = await Caretaker.findOne({ userId: id });

    const schedule = await Medicine.findById(requestId);

    if (!schedule) {
      return res.status(404).json({
        success: false,
        error: 'Schedule not found'
      });
    }
    schedule.caretaker = {
      name: user.name,
      userId: id
    };
    schedule.courseStatus = 'running';

    caretaker.runningSchedules.push(schedule._id);

    !caretaker.patients.includes(schedule.patient.userId) && caretaker.patients.push(schedule.patient.userId);

    await schedule.save();
    await caretaker.save();

    return res.json({
      success: true,
      message: 'Schedule accepted'
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });

  }
}

module.exports = acceptSchedule;