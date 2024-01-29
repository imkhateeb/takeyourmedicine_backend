const router = require('express').Router();

//Importing middlewares
const checkLoginMiddleware = require('../middlewares/auth/check_login');
const checkCaretakerMiddleware = require('../middlewares/auth/check_caretaker');
const checkPatientMiddleware = require('../middlewares/auth/check_patient');


//Importing controllers
const getAllUsers = require('../controllers/request_controllers/users');
const getAllCaretakers = require('../controllers/request_controllers/caretakers');
const getAllPatientsByCaretakerId = require('../controllers/request_controllers/patients');
const caretakerRequests = require('../controllers/request_controllers/requests');
const getMedicineSchedulesByPatientId = require('../controllers/request_controllers/schedules');
const getUserByUserId = require('../controllers/request_controllers/user');


router.get('/users', getAllUsers);
router.get('/', checkCaretakerMiddleware, caretakerRequests);
router.get('/user', checkLoginMiddleware, getUserByUserId);
router.get('/schedules', checkPatientMiddleware, getMedicineSchedulesByPatientId);
router.get('/patients', checkCaretakerMiddleware, getAllPatientsByCaretakerId);
router.get('/caretakers', checkPatientMiddleware, getAllCaretakers);

module.exports = router;