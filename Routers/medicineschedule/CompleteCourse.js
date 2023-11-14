const express = require('express');
const router = express.Router();

const { verifyToken } = require('../../tokenSetup');
const User = require('../../models/user');
const MedicineSchedule = require('../../models/medicine');

const SendToAll = require('../../mainSender');

router.get("/complete-medicine-schedule", async (req, res) => {
  const token = req.headers['token'];
  const requestId = req.headers['requestid'];

  try {
    const decoded = verifyToken(token);
    const userId = decoded.slice(1, decoded.length - 1);

    const myUser = await User.findOne({ _id: userId });

    if (myUser?.role == 'patient') {
      const mySchedule = await MedicineSchedule.findOne({ _id: requestId });

      if (mySchedule) {
        mySchedule.courseStatus = 'completed';
        await mySchedule.save();
        const message = `Hello ${myUser.name}, congratulations! on completing the medication course`;
        SendToAll(myUser.name, myUser.email, message, myUser.contactNo);
        return res.json({ success: true })
      }
    }
  } catch (error) {
    return res.json({ success: false })
  }
});

module.exports = router;