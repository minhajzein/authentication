
const User = require('../model/userModel')
const bcrypt = require('bcrypt')

module.exports = {

    signup: async (req, res) => {
        try {
            const userWithEmail = await User.find({ email: req.body.email });
            if (userWithEmail.length === 0) {
                const hashedPassword = await bcrypt.hash(req.body.password, 8)
                const user = await User.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword,
                    role: ['buyer']
                })
                res.json({ success: true, user: { id: user._id, email: user.email, username: user.username } }).status(200)
            } else {
                res.json({ success: false, err_msg: 'email is already taken' }).status(304)
            }
        } catch (error) {
            console.log(error);
            res.json({ success: false, err_msg: 'server not responding' }).status(500)
        }
    },

    login: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (user) {
                const password = await bcrypt.compare(req.body.password, user.password)
                if (password) {
                    res.json({
                        success: true,
                        user: {
                            id: user._id,
                            username: user.username,
                            email: user.email
                        }
                    }).status(200)
                } else {
                    res.json({ success: false, err_msg: 'Incorrect password' }).status(401)
                }
            } else {
                res.json({ success: false, err_msg: 'user not exist' })
            }
        } catch (error) {
            console.error(error);
            res.json({ success: false, err_msg: 'something went wrong please try again' }).status(500)
        }
    }

}