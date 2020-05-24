const errorBoundary = (error, req, res, next) => {
  if (error.name === 'ApplicationError') {
    return res.status(error.status).send({ error: error.story })
  }

  console.error(error.stack)
  res.status(500).json({ error: 'Internal server error' })
  return next(error)
}

module.exports = errorBoundary
