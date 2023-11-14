const mongoose = require('mongoose');
const { Schema } = mongoose;

const patientSchema = new Schema({
        name: String,
        userId: String,
        courseCount: {
                type: String,
                default: '0',
        },
        medicineIntakes: [{
                type: Schema.Types.ObjectId,
                ref: 'MedicineIntakeSchedules'
        }]
})

module.exports = mongoose.model("Patient", patientSchema);