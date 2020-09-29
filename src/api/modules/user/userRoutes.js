const { Router } = require('express');
const { Multer } = require('../../middlewares');

const controller = require('./userControllers');
const validaton = require('./userValidation');

const router = Router();
router.get('/', controller.getAll);
router.post('/upload', Multer.single('file'), validaton.uploadUser, controller.uploadUser);

module.exports = router;
