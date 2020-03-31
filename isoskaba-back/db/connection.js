const Sequelize = require('sequelize')
const EventEmitter = require('events')
const { DB_CONFIG, DB_CONNECTION_RETRY_LIMIT } = require('../config')

const sequelize = new Sequelize({
  ...DB_CONFIG
})

class DatabaseConnection extends EventEmitter {
  async connect(attempt = 1) {
    try {
      await sequelize.authenticate()
      this.emit('connected')
    } catch (e) {
      if (attempt === DB_CONNECTION_RETRY_LIMIT) {
        this.emit('error', e)
        return
      }
      console.info(`Connection to the database failed! Attempt ${attempt} of ${DB_CONNECTION_RETRY_LIMIT}`)
      setTimeout(() => this.connect(attempt + 1), 1000 * attempt)
    }
  }
}

const databaseConnection = new DatabaseConnection()
databaseConnection.connect()

databaseConnection.on('error', e => {
  console.error('Connection to the database failed', e)
})

module.exports = { sequelize, databaseConnection }
