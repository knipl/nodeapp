const { wrongCredentials } = require('../constants/error-messages')
const {
  validateRegData,
  validateLoginData,
  hashPw,
  decodeToken,
} = require('../auth/auth')
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const authConf = require('../config/auth-config')

exports.register = (req, res) => {
  const errors = validateRegData(req.body)
  if (!errors.length) {
    const email = req.body.email
    User.getUser(email, (user, code) => {
      if (user) {
        return res.status(409).send('User Already Exist. Please Login')
      } else {
        const newUser = new User(req.body.email, hashPw(req.body.password))
        newUser.save((result, code) => {
          res.status(code).send({ result })
        })
      }
    })
  } else res.status(400).send({ code: 400, errors })
}

exports.login = (req, res) => {
  const errors = validateLoginData(req.body)
  if (!errors.length) {
    const email = req.body.email
    const password = req.body.password
    User.getUser(email, (user, code) => {
      if (user && user.password === hashPw(password)) {
        const token = jwt.sign(
          { user_id: user.id, email }, //useful for separating different roles based on email, some kind of identification but not personal data preferred
          authConf.TOKENKEY,
          {
            expiresIn: '2m',
          }
        )

        delete user.password
        user.token = token

        res.status(201).json(user)
        res.send({ user })
      } else {
        res.status(500)
        res.send({ errors: wrongCredentials }) //TODO: constants
      }
    })
  } else {
    res.status(400).send({ errors })
  }
}

exports.getRefreshToken = (req, res) => {
  const { user_id, email } = decodeToken(req.headers['authorization'])
  const token = jwt.sign(
    { user_id, email }, //useful for separating different roles based on email, some kind of identification but not personal data preferred
    authConf.TOKENKEY, //normal hash like string would be safer
    {
      expiresIn: '2m',
    }
  )
  res.status(200).send({ token })
}
