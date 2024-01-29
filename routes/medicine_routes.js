const router = require('express').Router();

const acceptSchedule = require('../controllers/medicine_controllers/accept');
const rejectSchedule = require('../controllers/medicine_controllers/reject');
const completeSchedule = require('../controllers/medicine_controllers/complete');


const checkPatientMiddleware = require('../middlewares/auth/check_patient');
const checkCaretakerMiddleware = require('../middlewares/auth/check_caretaker');

router.patch('/accept/:requestId', checkCaretakerMiddleware, acceptSchedule);
router.patch('/reject/:requestId', checkCaretakerMiddleware, rejectSchedule);
router.patch('/complete/:requestId', checkPatientMiddleware, completeSchedule);

module.exports = router;