const router = require('express').Router()
const controller = require('../controller/cartController')

router.route('/:userId')
    .post(controller.addToCart)
    .get(controller.getCart)
    .patch(controller.updateCart)

module.exports = router