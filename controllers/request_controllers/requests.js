const MedicineIntakeSchedule = require('../../models/medicine');

const caretakerRequests = async (req, res) => {
  try {

    const patients = await MedicineIntakeSchedule.find({ courseStatus: 'Not started' });

    return res.json({
      success: true,
      patients,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });

  }
}

module.exports = caretakerRequests;