const express = require('express')

const tourRouter = require('../app/controllers/ToursController')

const router = express.Router()

router.get('/', tourRouter.index)
router.get('/details-tour', tourRouter.details)

module.exports = router