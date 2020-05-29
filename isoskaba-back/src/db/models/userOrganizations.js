const { Model, DATE, BIGINT } = require('sequelize')
const { sequelize } = require('../connection')

class UserOrganization extends Model {}

UserOrganization.init(
  {
    id: {
      type: BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    organizationId: {
      type: BIGINT,
      references: {
        model: 'organization',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    userId: {
      type: BIGINT,
      references: {
        model: 'user',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
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
    modelName: 'user_organization',
    tableName: 'user_organizations',
    indexes: [
      {
        unique: true,
        fields: ['organizationId', 'userId']
      }
    ]
  }
)

module.exports = UserOrganization
