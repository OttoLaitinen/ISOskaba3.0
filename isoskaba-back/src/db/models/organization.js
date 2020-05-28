const { Model, STRING, DATE, BIGINT, BOOLEAN } = require('sequelize')
const { sequelize } = require('../connection')

class Organization extends Model {}

Organization.init(
  {
    organizationId: {
      primaryKey: true,
      type: BIGINT,
      autoIncrement: true
    },
    name: {
      type: STRING
    },
    hasTutors: {
      type: BOOLEAN
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
    modelName: 'organizations',
    tableName: 'organizations'
  }
)

module.exports = Organization
