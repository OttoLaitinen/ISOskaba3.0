const { ApplicationError } = require('../utils/customErrors.js')
const errorBoundary = require('../middleware/errorBoundary')

const initRoutes = app => {
  app.get('*', () => {
    throw new ApplicationError('Not found', 404)
  })

  app.use(errorBoundary)
}

module.exports = {
  initRoutes
}
