const { Organization } = require('../db/models')
const { sequelize } = require('../db/connection')

const createOrganization = async (req, res) => {
  const { name, hasTutors } = req.body

  const t = await sequelize.transaction()

  try {
    const createdOrganization = await Organization.create({ name, hasTutors }, { transaction: t })

    await t.commit()

    res.json(createdOrganization)
  } catch (e) {
    t.rollback()
    throw e
  }
}

const getAllOrganizations = async (req, res) => {
  const organizations = await Organization.findAll()
  res.json(organizations)
}

module.exports = {
  createOrganization,
  getAllOrganizations
}
