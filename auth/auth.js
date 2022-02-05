const crypto = require('crypto')

exports.validateRegData = ({ email, password, password_confirmation }) => {
  if (!email || !password || !password_confirmation) {
    return ['missing email or password or password confirmaiton']
  }
  if (password !== password_confirmation) {
    return ['passwords dosent match']
  }
  return []
}

exports.validateLoginData = ({ email, password }) => {
  if (!email || !password) {
    return ['missing email or password']
  } else {
  }
  return []
}

exports.hashPw = (pw) => {
  return crypto.createHash('sha256').update(pw).digest('hex')
}
