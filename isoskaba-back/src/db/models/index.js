const User = require('./user')
const Organization = require('./organization')
const Event = require('./event')

const UserOrganization = require('./userOrganizations')
const EventOrganization = require('./eventOrganizations')
const UserEvent = require('./userEvents')

// UserOrganizations
User.hasMany(UserOrganization)
UserOrganization.belongsTo(User)

Organization.hasMany(UserOrganization)
UserOrganization.belongsTo(Organization)

// EventOrganizations
Event.hasMany(EventOrganization)
EventOrganization.belongsTo(Event)

Organization.hasMany(EventOrganization)
EventOrganization.belongsTo(Organization)

// UserEvents
Event.hasMany(UserEvent)
UserEvent.belongsTo(Event)

User.hasMany(UserEvent)
UserEvent.belongsTo(User)

module.exports = {
  User,
  Organization,
  Event,
  UserOrganization,
  EventOrganization,
  UserEvent
}
