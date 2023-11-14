const express = require('express');
const router = express.Router();
const {generateToken} = require('../../tokenSetup');

const User = require('../../models/user');
const md5 = require('md5');

router.get("/auth-user", async (req, res) => {
   const authId = req.headers['authid'];
   const password = req.headers['password'];

   try {
      const myUser = await User.findOne({$and: [{$or: [{email: authId}, {contactNo: authId}]}, {password: md5(password)}]});

      if ( myUser ){
         const authToken = generateToken(JSON.stringify(myUser._id));
         res.json({success: true, userExists: true, authToken })
      } else {
         res.json({success: true, userExists: false})
      }
   } catch (error) {
      res.json({success: false})
   }
})

module.exports = router;