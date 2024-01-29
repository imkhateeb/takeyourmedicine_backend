const MedicineIntakeSchedule = require('../../models/medicine');
const scheduleReminders = require('../../utils/scheduler');

const createSchedule = async (req, res) => {
  const { user } = req;

  const { medicineNames, frequency, from, to, times, email, contactNo, careBy } = req.body;

  try {
    const patient = {
      name: user.name,
      userId: user._id,
    }

    if (careBy !== 'self' && careBy !== 'inperson') {

      const caretaker = {
        name: careBy.name,
        userId: careBy.userId,
      }

      const medicineObj = { medicineNames, frequency, from, to, times, email, contactNo, whatsAppNo: contactNo, patient, careBy: 'inperson', courseStatus: 'running', caretaker };
      const newMedicineSchedule = new MedicineIntakeSchedule(medicineObj);
      await newMedicineSchedule.save();

      scheduleReminders({ medicineNames, frequency, from, to, times, email, contactNo, whatsAppNo: contactNo, scheduleId: newMedicineSchedule?._id, patientName: user.name });

    } else {

      const medicineObj = { medicineNames, frequency, from, to, times, email, contactNo, whatsAppNo: contactNo, patient, careBy, courseStatus: careBy == 'self' ? 'running' : 'Not Started' };
      const newMedicineSchedule = new MedicineIntakeSchedule(medicineObj);
      await newMedicineSchedule.save();

      if (careBy === 'self') {
        scheduleReminders({ medicineNames, frequency, from, to, times, email, contactNo, whatsAppNo: contactNo, scheduleId: newMedicineSchedule?._id, patientName: user.name });
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Schedule created successfully'
    });


  } catch (error) {

    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = createSchedule;