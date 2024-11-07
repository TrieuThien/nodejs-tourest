var express = require('express')

var router = express.Router()

const blogController = require('../app/controllers/BlogController')


router.get('/', blogController.index)
router.get('/details-blog', blogController.details)

module.exports = router