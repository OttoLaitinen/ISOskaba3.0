const express = require('express')
const cors = require('cors')
const { initRoutes } = require('./routes')
const { databaseConnection } = require('./db/connection')
const { PORT } = require('./config/index')

const app = express()
app.use(express.json())
app.use(cors())
initRoutes(app)

databaseConnection.once('connected', () => {
  console.info('Connected to the database successfully')
  app.listen(PORT, () => {
    console.info(`App listening on port ${PORT}`)
  })
})
