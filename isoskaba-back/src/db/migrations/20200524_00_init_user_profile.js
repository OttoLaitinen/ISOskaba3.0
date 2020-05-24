const { STRING, DATE, DOUBLE, INTEGER, BIGINT, ENUM } = require('sequelize')

module.exports = {
  up: async queryInterface => {
    await queryInterface.createTable('users', {
      user_id: {
        primaryKey: true,
        type: BIGINT,
        autoIncrement: true
      },
      username: {
        type: STRING,
        unique: true
      },
      password: {
        type: STRING
      },
      salt: {
          type: STRING
      },
      first_name: {
        type: STRING
      },
      last_name: {
        type: STRING
      },
      email: {
        type: STRING,
        unique: true
      },
      role: {
        type: ENUM('USER', 'ADMIN', 'SUPERADMIN')
      },
      created_at: {
        type: DATE
      },
      updated_at: {
        type: DATE
      }
    })
  },
  down: async () => {}
}
