const Patient = require('../../models/patient');
const Caretaker = require('../../models/caretaker');

const getMedicineSchedulesByPatientId = async (req, res) => {
  const { role } = req.body;
  const { id } = req.user;
  try {

    if (role !== 'patient') {
      const runningSchedules = await Patient.findOne({ userId: id }).courseRunning.populate('MedicineIntakeSchedules');

      const completedSchedules = await Patient.findOne({ userId: id }).courseCompleted.populate('MedicineIntakeSchedules');

      const schedules = {
        runningSchedules: runningSchedules.runningSchedules,
        completedSchedules: completedSchedules.completedSchedules,
      }

      return res.json({
        success: true,
        schedules,
      });

    } else if (role === 'caretaker') {

      const runningSchedules = await Caretaker.findOne({ userId: id }).courseRunning.populate('MedicineIntakeSchedules');

      const completedSchedules = await Caretaker.findOne({ userId: id }).courseCompleted.populate('MedicineIntakeSchedules');

      const schedules = {
        runningSchedules: runningSchedules.runningSchedules,
        completedSchedules: completedSchedules.completedSchedules,
      }
      return res.json({
        success: true,
        schedules,
      });
      
    } else {
      return res.json({
        success: false,
        message: 'Invalid role'
      });
    }

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });

  }

}

module.exports = getMedicineSchedulesByPatientId;