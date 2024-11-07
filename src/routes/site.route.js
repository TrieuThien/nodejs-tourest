var express = require('express')

var router = express.Router()

const siteController = require('../app/controllers/SiteController')


router.get('/about-us', siteController.aboutUs)
router.get('/destinations', siteController.destinations)

router.get('/login', siteController.renderLogin)
router.get('/sign-up', siteController.renderSignUp)

router.get('/user', siteController.accountPage)

router.get('/logout', siteController.logout)

router.post('/user-login', siteController.login)
router.post('/user-signup', siteController.signUp)

router.get('/admin', siteController.adminPage)

router.get('/', siteController.home)

router.get('/:slug', siteController.home)
 
module.exports = router