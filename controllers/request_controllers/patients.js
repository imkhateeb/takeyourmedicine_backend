const Caretaker = require('../../models/caretaker');

const getAllPatientsByCaretakerId = async (req, res) => {
  try {
    const { id } = req.user;

    const patients = await Caretaker.findById(id).populate('patients');

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

module.exports = getAllPatientsByCaretakerId;