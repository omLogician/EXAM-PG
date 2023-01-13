const userController = require('../controllers/userController.js')
const router = require('express').Router()

router.post('/register', userController.register)
router.post('/login', userController.login)

module.exports = router