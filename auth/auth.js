const crypto = require('crypto')

exports.validateRegData = ({ email, password, password_confirmation }) => {
  if (!email || !password || !password_confirmation) {
    return false
  }
  if (password !== password_confirmation) {
    return false
  }
  return true
}

exports.validateLoginData = ({ email, password }) => {
  const errors = []
  if (!email || !password) {
    return errors.push('missing email or password')
  }
  return errors
}

exports.hashPw = (pw) => {
  return crypto.createHash('sha256').update(pw).digest('hex')
}
