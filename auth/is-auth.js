const { decodeToken } = require('./auth')

module.exports = (req, res, next) => {
  const token = req.headers['authorization']
  if (!token) {
    return res.status(403).send('token is required for authentication')
  }

  try {
    req.user = decodeToken(token)
    return next()
  } catch {
    return res.status(401).send('Invalid Token')
  }
}
