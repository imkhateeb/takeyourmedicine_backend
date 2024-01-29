const mongoose = require('mongoose');
const { Schema } = mongoose;

const patientSchema = new Schema({
        name: String,
        userId: String,
        courseRunning: [{
                type: Schema.Types.ObjectId,
                ref: 'MedicineIntakeSchedules'
        }],
        courseCompleted: [{
                type: Schema.Types.ObjectId,
                ref: 'MedicineIntakeSchedules'
        }]
})

module.exports = mongoose.model("Patient", patientSchema);