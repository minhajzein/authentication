const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true
    },
    products: {
        type: Array
    }
})

module.exports = Cart = mongoose.model('cart', cartSchema)