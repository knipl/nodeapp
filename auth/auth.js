const {
  missingCredentials,
  notMatchingPasswords,
  notValidEmail,
} = require('../constants/error-messages')
const jwt = require('jsonwebtoken')
const authConf = require('../config/auth-config')
const crypto = require('crypto')
const emailRegex =
  '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/'

exports.validateRegData = ({ email, password, password_confirmation }) => {
  let errors = []
  if (!email || !password || !password_confirmation) {
    errors.push(missingCredentials)
  } else {
    if (!isEmailValid) {
      errors.push(notValidEmail)
    }
    if (password !== password_confirmation) {
      errors.push(notMatchingPasswords)
    }
  }
  return errors
}

exports.validateLoginData = ({ email, password }) => {
  let errors = []
  if (!email || !password) {
    errors.push(missingCredentials)
  } else if (!isEmailValid) {
    errors.push(notValidEmail)
  }
  return errors
}

exports.hashPw = (pw) => {
  return crypto.createHash('sha256').update(pw).digest('hex')
}

const isEmailValid = (email) => {
  return email.match(emailRegex)
}

exports.decodeToken = (token) => {
  const bearerToken = token.replace(/^Bearer\s+/, '')
  return jwt.verify(bearerToken, authConf.TOKENKEY)
}
