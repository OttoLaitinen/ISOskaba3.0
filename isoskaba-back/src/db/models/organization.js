const { Model, STRING, DATE, BIGINT, BOOLEAN } = require('sequelize')
const { sequelize } = require('../connection')

class Organization extends Model {}

Organization.init(
  {
    id: {
      primaryKey: true,
      type: BIGINT,
      autoIncrement: true
    },
    name: {
      type: STRING,
      allowNull: false
    },
    hasTutors: {
      type: BOOLEAN,
      defaultValue: false
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
    modelName: 'organization',
    tableName: 'organizations'
  }
)

module.exports = Organization
