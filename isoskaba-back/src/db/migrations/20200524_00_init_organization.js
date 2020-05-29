const { STRING, DATE, BIGINT, BOOLEAN } = require('sequelize')

module.exports = {
  up: async queryInterface => {
    await queryInterface.createTable('organizations', {
      id: {
        primaryKey: true,
        type: BIGINT,
        autoIncrement: true
      },
      name: {
        type: STRING,
        allowNull: false
      },
      has_tutors: {
        type: BOOLEAN,
        defaultValue: false
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
