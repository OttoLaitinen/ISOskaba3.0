const { Model, DATE, BIGINT } = require('sequelize')
const { sequelize } = require('../connection')

class EventOrganization extends Model {}

EventOrganization.init(
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
    eventId: {
      type: BIGINT,
      references: {
        model: 'event',
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
    modelName: 'event_organization',
    tableName: 'event_organizations',
    indexes: [
      {
        unique: true,
        fields: ['organizationId', 'eventId']
      }
    ]
  }
)

module.exports = EventOrganization
