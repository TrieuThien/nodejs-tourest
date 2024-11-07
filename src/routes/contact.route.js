const express = require('express')

const router = express.Router()

const contactController = require('../app/controllers/ContactController')

router.post('/send', contactController.send)
router.get('/', contactController.index)


module.exports = router