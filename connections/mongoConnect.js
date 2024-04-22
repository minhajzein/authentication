const mongoose = require('mongoose')
const url = process.env.DATABASE_URL

const connectDB = async () => {
    mongoose.set({ strictQuery: false })
    try {
        await mongoose.connect(url)
        console.log('Database connected successfully');
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB