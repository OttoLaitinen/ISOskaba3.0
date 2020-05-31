const { DATE, BIGINT } = require('sequelize')

module.exports = {
  up: async queryInterface => {
    await queryInterface.createTable('event_organizations', {
      id: {
        type: BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      organization_id: {
        type: BIGINT,
        references: {
          model: 'organizations',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
