const { ApplicationError } = require('../utils/customErrors.js')
const errorBoundary = require('../middleware/errorBoundary')
const authMiddleware = require('../middleware/auth')
const { register, login } = require('./auth')
const { createOrganization, getAllOrganizations } = require('./organization')

const initRoutes = app => {
  app.post('/v1/register', register)

  app.post('/v1/login', login)

  app.post('/v1/organization', authMiddleware, createOrganization)

  app.get('/v1/organization', authMiddleware, getAllOrganizations)

  app.get('/ping', authMiddleware, (req, res) => {
    res.json(res.locals)
  })

  app.get('*', () => {
    throw new ApplicationError('Not found', 404)
  })

  app.use(errorBoundary)
}

module.exports = {
  initRoutes
}
