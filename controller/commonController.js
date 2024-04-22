const Product = require('../model/productModel')

module.exports = {

    getHome: (req, res) => {
        res.send('hello world')
    },

    addProduct: async (req, res) => {
        try {
            await Product.create(req.body)
            res.json({ success: true })
        } catch (error) {
            console.log(error);
            res.json({ success: false, err_msg: 'internal server error' }).status(500)
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find()
            res.json({ success: true, products }).status(200)
        } catch (error) {
            res.json({ success: false, err_msg: 'internal sever error' }).status(500)
        }
    }

}












