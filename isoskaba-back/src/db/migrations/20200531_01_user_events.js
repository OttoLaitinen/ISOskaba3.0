const { DATE, BIGINT, BOOLEAN } = require('sequelize')

module.exports = {
  up: async queryInterface => {
    await queryInterface.createTable('user_events', {
      id: {
        type: BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      event_id: {
        type: BIGINT,
        references: {
          model: 'events',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      user_id: {
        type: BIGINT,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      confirmed_by_admin: {
        type: BOOLEAN,
        defaultValue: false,
        allowNull: false
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
