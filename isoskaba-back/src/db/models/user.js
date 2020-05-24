const { Model, STRING, DATE, BIGINT, ENUM } = require('sequelize')
const { sequelize } = require('../connection')

class User extends Model {}

User.init(
  {
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
      firstName: {
        type: STRING
      },
      lastName: {
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
  },
  {
    underscored: true,
    sequelize,
    modelName: 'users',
    tableName: 'users'
  }
)

module.exports = User