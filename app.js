const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT
const userRouter = require('./routes/userRouter')
const cartRouter = require('./routes/cartRouter')
const connectDB = require('./connections/mongoConnect')
const corsOptions = require('./config/corsOptions')
const morgan = require('morgan')

connectDB()
app.use(morgan('dev'))
app.use(cors(corsOptions))

app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(express.json({ limit: '50mb' }))

mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`server listening on port ${PORT}`);
    })
})


app.use('/', userRouter)
app.use('/cart', cartRouter)

module.exports = app