const rejectSchedule = async (req, res) => {
  return res.json({
    success: true,
    message: 'Schedule rejected'
  });
}

module.exports = rejectSchedule;
