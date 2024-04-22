const Cart = require('../model/cartModel')
const Product = require('../model/productModel')

module.exports = {
    addToCart: async (req, res) => {
        try {
            const cart = await Cart.findOne({ user: req.params.userId })
            if (cart) {
                const existingIndex = cart.products.findIndex(x => x.id === req.body.productId)
                if (existingIndex !== -1) {
                    await Cart.updateOne(
                        { _id: cart._id, 'products.id': req.body.productId },
                        { $inc: { 'products.$.quantity': 1 } }
                    )
                    res.json({ success: true }).status(200)
                } else {
                    await Cart.updateOne({ _id: cart._id }, {
                        $push: { products: { id: req.body.productId, quantity: 1 } }
                    })
                    res.json({ success: true }).status(200)
                }
            } else {
                await Cart.create({
                    user: req.params.userId,
                    products: [{ id: req.body.productId, quantity: 1 }]
                })
                res.json({ success: true })
                    .status(201)
            }

        } catch (error) {
            console.error(error.message);
            res.json({ success: false, err_msg: 'Internal server error' }).status(500)
        }
    },

    getCart: async (req, res) => {
        try {
            const cart = await Cart.findOne({ user: req.params.userId }).populate({
                path: 'products.id',
                model: 'Product'
            })
            res.json({ success: true, cart }).status(200)
        } catch (error) {
            console.error(error);
            res.json({ success: false, err_msg: 'Internal server error' }).status(500)
        }
    },

    updateCart: async (req, res) => {
        try {
            const cart = await Cart.findOne({ user: req.params.userId })
            const product = await Product.findById(req.body.productId)
            let cartItem = cart.products.find(x => x.id == product._id)
            if (cartItem.quantity >= product.stock && req.body.quantity === 1) return res.json({ success: false, err_msg: 'reached maximum quantity of product' })
            if (cartItem.quantity <= 1 && req.body.quantity === -1) return res.json({
                success: false, err_msg: 'quantity should be atleast 1'
            })
            await Cart.updateOne(
                { _id: cart._id, 'products.id': req.body.productId },
                { $inc: { 'products.$.quantity': req.body.quantity } }
            )
            res.json({ success: true }).status(200)
        } catch (error) {
            console.error(error);
            res.json({ success: false, err_msg: 'Internal server error' }).status(500)
        }
    }
}