const { Model, STRING, DATE, BIGINT, BOOLEAN, DOUBLE, INTEGER } = require('sequelize')
const { sequelize } = require('../connection')

class Event extends Model {}

Event.init(
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
    startTime: {
      type: DATE,
      allowNull: false
    },
    endTime: {
      type: DATE
    },
    openForAll: {
      type: BOOLEAN,
      defaultValue: false
    },
    points: {
      type: DOUBLE,
      defaultValue: 0
    },
    participationCountMaximum: {
      type: INTEGER,
      defaultValue: 1
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
    modelName: 'event',
    tableName: 'events'
  }
)

module.exports = Event
