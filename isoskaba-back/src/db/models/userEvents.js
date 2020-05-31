const { Model, DATE, BIGINT, BOOLEAN } = require('sequelize')
const { sequelize } = require('../connection')

class UserEvent extends Model {}

UserEvent.init(
  {
    id: {
      type: BIGINT,
      primaryKey: true,
      autoIncrement: true
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
    userId: {
      type: BIGINT,
      references: {
        model: 'user',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    confirmedByAdmin: {
      type: BOOLEAN,
      defaultValue: false,
      allowNull: false
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
    modelName: 'user_event',
    tableName: 'user_events'
  }
)

module.exports = UserEvent
