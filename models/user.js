const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
   name: {
      type: 'String',
      required: true,
   },
   email: {
      type: 'String',
      required: true,
   },
   contactNo: {
      type: 'String',
      required: true,
   },
   password: {
      type: 'String',
      required: true,
   },
   role: {
      type: 'String',
      required: true,
   },
   dateCreated: {
      type: Date,
      default: Date.now,
   }
});

module.exports = mongoose.model("User", userSchema);