const express = require("express");
const router = express.Router();
const md5 = require('md5');
const {generateToken} = require('../../tokenSetup');


const User = require('../../models/user');
const Patient = require('../../models/patient');
const Caretaker = require('../../models/caretaker');

router.post('/create-user', async (req, res) => {
   const { name, email, contactNo, role, password } = req.body;

   try {
      const existingUser = await User.findOne({ $or: [{ email }, { contactNo }] });

      if (existingUser) {
         res.json({ success: true, status: "userexist" });
      } else {
         const user = new User({
            name,
            email,
            contactNo,
            password: md5(password),
            role,
         });

         const roleObj = {
            name,
            userId: (user._id).toString(),
         }

         await user.save();
         if (role === 'caretaker') {
            const myCaretaker = new Caretaker(roleObj);
            await myCaretaker.save();
         } else {
            const myPatient = new Patient(roleObj);
            await myPatient.save();
         }

         
         const authToken = generateToken(JSON.stringify(user._id));
         

         res.json({ success: true, status: 'usercreated', authToken});
         
      }

   } catch (error) {
      res.json({ success: false })
   }
});

module.exports = router;