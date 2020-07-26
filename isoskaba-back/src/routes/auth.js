const { User, Organization, UserOrganization } = require('../db/models')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { ApplicationError } = require('../utils/customErrors')
const { Op } = require('sequelize')
const { sequelize } = require('../db/connection')

const register = async (req, res) => {
  const { username, email, password, organizationIds } = req.body

  // TODO: Validate if email is correct email etc

  if (!(username && email && password && organizationIds)) throw new ApplicationError('Some params missing', 400)
  if (!(Array.isArray(organizationIds) && organizationIds.length))
    throw new ApplicationError('Organization(s) not given', 400)

  const uniqueOrganizationIds = new Set(organizationIds)
  const assignedOrganizations = await Organization.findAll({
    where: {
      id: {
        [Op.in]: [...uniqueOrganizationIds]
      }
    }
  })
  if (assignedOrganizations.length !== uniqueOrganizationIds.size)
    throw new ApplicationError('One or more organizations invalid', 400)

  const foundUser = await User.findOne({ where: { [Op.or]: [{ username }, { email }] } })
  if (foundUser) throw new ApplicationError('Username or email already taken', 400)

  const salt = crypto.randomBytes(16).toString('hex')
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')

  const t = await sequelize.transaction()
  try {
    const createdUser = await User.create(
      {
        username,
        email,
        salt,
        password: hashedPassword,
        firstName: '',
        lastName: '',
        role: 'USER'
      },
      { transaction: t }
    )

    await UserOrganization.bulkCreate(
      [...uniqueOrganizationIds].map(oI => ({
        userId: createdUser.id,
        organizationId: oI
      })),
      { transaction: t }
    )

    await t.commit()

    // TODO: Only put guild organizations to the token
    const token = jwt.sign(
      { username: createdUser.username, role: createdUser.role, organizationIds: [...uniqueOrganizationIds] },
      process.env.TOKEN_SECRET,
      {
        expiresIn: '1h'
      }
    )

    res.json(token)
  } catch (e) {
    t.rollback()
    throw e
  }
}

const login = async (req, res) => {
  const { username, password } = req.body

  if (!(username && password)) throw new ApplicationError('Login failure', 403)

  const foundUser = await User.findOne({ where: { username } })

  if (!foundUser) throw new ApplicationError('Login failure', 403)

  const userSalt = foundUser.salt
  const userPasswordHash = foundUser.password

  const givenPasswordHashed = crypto.pbkdf2Sync(password, userSalt, 100000, 64, 'sha512').toString('hex')

  if (userPasswordHash !== givenPasswordHashed) throw new ApplicationError('Login failure', 403)

  const token = jwt.sign({ username: foundUser.username, role: foundUser.role }, process.env.TOKEN_SECRET, {
    expiresIn: '1h'
  })

  res.json(token)
}

module.exports = {
  register,
  login
}
