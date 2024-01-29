const mongoose = require('mongoose');
const { Schema } = mongoose;

const caretakerSchema = new Schema({
  name: String,
  userId: String,
  completedScedules: [{
    type: Schema.Types.ObjectId,
    ref: 'MedicineIntakeSchedules'
  }],
  runningSchedules: [{
    type: Schema.Types.ObjectId,
    ref: 'MedicineIntakeSchedules'
  }],
  dateJoined: {
    type: Date,
    default: Date.now
  },
  patients: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
})

module.exports = mongoose.model("Caretaker", caretakerSchema);