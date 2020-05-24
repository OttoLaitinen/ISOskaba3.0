const jwt = require('jsonwebtoken')
const { ApplicationError } = require('../utils/customErrors')

module.exports = async (req, res, next) => {
    const token = req.headers['x-access-token']

    if (!token) throw new ApplicationError('Token missing', 403)

    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)

        /* TODO: Check that token hasn't been expired */
        // if (new Date().getTime() > decodedToken.exp) throw new ApplicationError('Token expired', 403)

        res.locals.decodedToken = decodedToken

        next()
    } catch (e) {
        console.log('e', e)
        throw new ApplicationError('Failed verifying token', 403)
    }
}
