const allowedOrigins = ['http://localhost:5173']

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not an allowed origin'))
        }
    },
    optionSuccessStatus: 200
}

module.exports = corsOptions