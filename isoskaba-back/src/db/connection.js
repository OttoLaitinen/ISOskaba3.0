const Sequelize = require('sequelize')
const Umzug = require('umzug')
const EventEmitter = require('events')
const { DB_CONFIG, DB_CONNECTION_RETRY_LIMIT } = require('../config')

const sequelize = new Sequelize({
  ...DB_CONFIG
})

class DatabaseConnection extends EventEmitter {
  async connect(attempt = 1) {
    try {
      await sequelize.authenticate()
      await this.runMigrations()
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

  async runMigrations() {
    try {
      const migrator = new Umzug({
        storage: 'sequelize',
        storageOptions: {
          sequelize: sequelize,
          tableName: 'migrations'
        },
        logging: console.log,
        migrations: {
          params: [sequelize.getQueryInterface(), Sequelize],
          path: `${process.cwd()}/src/db/migrations`,
          pattern: /\.js$/
        }
      })
      const migrations = await migrator.up()
      console.log('Migrations up to date', migrations)
    } catch (e) {
      console.log('Migration error', e)
      throw e
    }
  }
}

const databaseConnection = new DatabaseConnection()
databaseConnection.connect()

databaseConnection.on('error', e => {
  console.error('Connection to the database failed', e)
})

module.exports = { sequelize, databaseConnection }
