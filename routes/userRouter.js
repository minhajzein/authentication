const router = require('express').Router()
const controller = require('../controller/commonController')
const authController = require('../controller/authController')


router.get('/', controller.getHome)

// authentication 
router.post('/signup', authController.signup)
router.post('/login', authController.login)


// product routes
router.post('/addproduct', controller.addProduct)
router.get('/products', controller.getAllProducts)


module.exports = router