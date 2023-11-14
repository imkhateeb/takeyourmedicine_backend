const express = require('express');
const router = express.Router();

const User = require('../../models/user');
const MedicineIntakeSchedule = require('../../models/medicine');
const {verifyToken} = require('../../tokenSetup');

router.get("/my-schedule-list", async (req, res) => {
   const token = req.headers['token'];

   try {
      const decoded = verifyToken(token);
      const userId = decoded.slice(1, decoded.length - 1);
      const myUser = await User.findOne({ _id: userId });

      if (myUser?.role) {
         const totalList = await MedicineIntakeSchedule.find();
         const patientList = totalList.filter((patient) => patient.patient.userId == userId)
         const finalList = [...patientList].reverse();
         return res.json({ success: true, patientList: finalList, user: myUser })
      } else {
         return res.json({ success: false });
      }

   } catch (error) {
      res.json({ success: false })

   }
})

module.exports = router;