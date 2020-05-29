const { STRING, DATE, BIGINT, ENUM } = require('sequelize')

module.exports = {
  up: async queryInterface => {
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        type: BIGINT,
        autoIncrement: true
      },
      username: {
        type: STRING,
        unique: true
      },
      password: {
        type: STRING,
        allowNull: false
      },
      salt: {
        type: STRING,
        allowNull: false
      },
      first_name: {
        type: STRING,
        allowNull: false
      },
      last_name: {
        type: STRING,
        allowNull: false
      },
      email: {
        type: STRING,
        unique: true,
        isEmail: true,
        allowNull: false
      },
      role: {
        type: ENUM('USER', 'ADMIN', 'SUPERADMIN'),
        defaultValue: 'USER'
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
