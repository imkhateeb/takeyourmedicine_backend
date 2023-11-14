const express = require('express');
const router = express.Router();
const {verifyToken} = require('../../tokenSetup');

const User = require('../../models/user');
const MedicineIntakeSchedule = require('../../models/medicine');

router.get("/caretaker-request-list", async (req, res) => {
   const token = req.headers['token'];


   try {

      const decoded = verifyToken(token);
      const userId = decoded.slice(1, decoded.length-1);

      const myUser = await User.findOne({_id: userId});

      if ( myUser?.role ){

         const requestlist = await MedicineIntakeSchedule.find({$and: [{ careBy: 'inperson' }, {courseStatus: 'Not Started'}]});
         const finalList = [...requestlist].reverse();
         
         return res.json({ success: true, requestlist: finalList, user: myUser })
      } else {
         return res.json({success: false});
      }

   } catch (error) {
      res.json({ success: false })

   }
})

module.exports = router;