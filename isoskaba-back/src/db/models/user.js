const { Model, STRING, DATE, BIGINT, ENUM } = require('sequelize')
const { sequelize } = require('../connection')

class User extends Model {}

User.init(
  {
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
      unique: true,
      isEmail: true,
      allowNull: false
    },
    role: {
      type: ENUM('USER', 'ADMIN', 'SUPERADMIN')
    },
    createdAt: {
      type: DATE
    },
    updatedAt: {
      type: DATE
    }
  },
  {
    underscored: true,
    sequelize,
    modelName: 'user',
    tableName: 'users'
  }
)

module.exports = User
