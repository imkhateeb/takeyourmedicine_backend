const router = require('express').Router();
// const upload = require('../utils/multer_setup');

const checkLoginMiddleware = require('../middlewares/auth/check_login');

const createChat = require('../controllers/chat_controllers/create');
const getChat = require('../controllers/chat_controllers/read');
const updateChat = require('../controllers/chat_controllers/update');
const deleteChat = require('../controllers/chat_controllers/delete');


router.get('/:chatId', checkLoginMiddleware, getChat);

router.post('/', checkLoginMiddleware, createChat);

router.patch('/:chatId', checkLoginMiddleware, updateChat);

router.delete('/:chatId', checkLoginMiddleware, deleteChat);