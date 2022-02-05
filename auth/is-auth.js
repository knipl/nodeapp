const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers['authorization']
  if (!token) {
    return res.status(403).send('token is required for authentication')
  }

  try {
    console.log(token, { replaced: token.replace(/^Bearer\s+/, '') })
    const replacedToken = token.replace(/^Bearer\s+/, '')
    const decoded = jwt.verify(replacedToken, 'THISISMYTOKENKEY')
    req.user = decoded
    console.log({ decoded })
  } catch {
    return res.status(401).send('Invalid Token')
  }
  return next()
}
