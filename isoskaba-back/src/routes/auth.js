const { User } = require('../db/models')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { ApplicationError } = require('../utils/customErrors')

const register = async (req, res) => {
  const { username, email, password } = req.body

  if (!(username && email && password)) throw new ApplicationError('Some params missing', 400)

  const salt = crypto.randomBytes(16).toString('hex')
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')

  /* TODO: Check if email already taken etc. */

  const createdUser = await User.create({
    username,
    email,
    salt,
    password: hashedPassword,
    firstName: '',
    lastName: '',
    role: 'USER'
  })

  const token = jwt.sign({ username: createdUser.username, role: createdUser.role }, process.env.TOKEN_SECRET, {
    expiresIn: '1h'
  })

  res.json(token)
}

const login = async (req, res) => {
  const { username, password } = req.body

  // TODO: Check if no password given etc etc...

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
