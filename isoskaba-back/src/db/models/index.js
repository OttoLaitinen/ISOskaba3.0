const User = require('./user')
const Organization = require('./organization')
const Event = require('./event')

const UserOrganizations = require('./userOrganizations')

User.hasMany(UserOrganizations)
UserOrganizations.belongsTo(User)

Organization.hasMany(UserOrganizations)
UserOrganizations.belongsTo(Organization)

/* User.belongsToMany(Organization, {
  through: UserOrganizations,
  foreignKey: 'userId'
})
Organization.belongsToMany(User, {
  through: UserOrganizations,
  foreignKey: 'organizationId'
}) */

module.exports = {
  User,
  Organization,
  Event,
  UserOrganizations
}
