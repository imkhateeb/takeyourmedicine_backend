const router = require('express').Router();

//Importing middlewares
const checkLoginMiddleware = require('../middlewares/auth/check_login');

//Importing controllers
const createUser = require('../controllers/user_controllers/create');
const deleteUser = require('../controllers/user_controllers/delete');
const loginUser = require('../controllers/user_controllers/login');
const updateUser = require('../controllers/user_controllers/update');


router.post('/', createUser);
router.get('/', loginUser);
router.patch('/', checkLoginMiddleware, updateUser);
router.delete('/', checkLoginMiddleware, deleteUser);

module.exports = router;