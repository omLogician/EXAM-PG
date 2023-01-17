const userController = require('../controllers/userController.js')
const router = require('express').Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/updatePassword', userController.updatePassword);
router.post('/forgetPassword', userController.forgetPassword);
router.post('/resetPassword', userController.resetPassword);
module.exports = router