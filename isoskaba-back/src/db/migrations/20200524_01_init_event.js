const { STRING, DATE, BIGINT, BOOLEAN, DOUBLE, INTEGER } = require('sequelize')

module.exports = {
  up: async queryInterface => {
    await queryInterface.createTable('events', {
      id: {
        primaryKey: true,
        type: BIGINT,
        autoIncrement: true
      },
      name: {
        type: STRING,
        allowNull: false
      },
      start_time: {
        type: DATE,
        allowNull: false
      },
      end_time: {
        type: DATE
      },
      open_for_all: {
        type: BOOLEAN,
        defaultValue: false
      },
      points: {
        type: DOUBLE,
        defaultValue: 0
      },
      participation_count_maximum: {
        type: INTEGER,
        defaultValue: 1
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
