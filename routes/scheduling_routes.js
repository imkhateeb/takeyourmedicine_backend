const router = require('express').Router();

//Importing middlewares
const checkLoginMiddleware = require('../middlewares/auth/check_login');
const checkCaretakerMiddleware = require('../middlewares/auth/check_caretaker');
const checkPatientMiddleware = require('../middlewares/auth/check_patient');

//Importing controllers
const createSchedule = require('../controllers/scheduling_controllers/create');
const updateSchedule = require('../controllers/scheduling_controllers/update');
const { getScheduleByPatientId, getScheduleByCaretakerId, getScheduleByMedicineId } = require('../controllers/scheduling_controllers/get');
const deleteSchedule = require('../controllers/scheduling_controllers/delete');


// Create a schedule
router.post('/', checkPatientMiddleware, createSchedule);

// Get a schedule or schedules
router.get('/patient', checkPatientMiddleware, getScheduleByPatientId);
router.get('/caretaker', checkCaretakerMiddleware, getScheduleByCaretakerId);
router.get('/:id', checkLoginMiddleware, getScheduleByMedicineId);

// Update a schedule
router.put('/', checkPatientMiddleware, updateSchedule);

// Delete a schedule
router.delete('/', checkPatientMiddleware, deleteSchedule);

module.exports = router;