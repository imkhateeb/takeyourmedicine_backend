const mongoose = require('mongoose');
const { Schema } = mongoose;

const caretakerSchema = new Schema({
        name: String,
        userId: String,
        courseCount: {
                type: String,
                default: '0',
        },
        takeCareOf: [{
                type: Schema.Types.ObjectId,
                ref: 'MedicineIntakeSchedules'
        }],
        patientCount: {
                type: String,
                default: '0',
        },
})

module.exports = mongoose.model("Caretaker", caretakerSchema);