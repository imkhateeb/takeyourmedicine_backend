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
   },
   deleted: {
      type: Boolean,
      default: false,
   },
   chats: [{
      title: {
         type: 'String',
         required: true,
      },
      id: {
         type: Schema.Types.ObjectId,
         ref: 'AIchat',
      }
   }]
});

module.exports = mongoose.model("User", userSchema);