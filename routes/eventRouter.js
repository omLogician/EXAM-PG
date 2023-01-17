const eventController = require('../controllers/eventController.js')
const router = require('express').Router()

router.post('/createEvent', eventController.createEvent);

module.exports = router;