const express = require('express')

const router = express.Router()

const bookingController = require('../app/controllers/BookingController')

router.get('/', bookingController.index)
router.post('/regist', bookingController.registBooking)

module.exports = router