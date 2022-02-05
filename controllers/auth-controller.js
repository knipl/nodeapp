const { validateRegData, validateLoginData, hashPw } = require('../auth/auth')
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')

exports.register = (req, res) => {
  const errors = validateRegData(req.body)
  if (!errors.length) {
    const newUser = new User(req.body.email, hashPw(req.body.password))
    newUser.save((result) => {
      res.send(result)
    })
  } else res.send({ code: 400, errors })
}

exports.login = (req, res) => {
  const errors = validateLoginData(req.body)
  if (!errors.length) {
    const email = req.body.email
    const password = req.body.password
    User.getUser((result, code) => {
      const user = result[0]
      if (user && user.password === hashPw(password)) {
        const token = jwt.sign(
          { user_id: user.id, email },
          'THISISMYTOKENKEY',
          {
            expiresIn: '2m',
          }
        )

        delete user.password
        user.token = token

        res.status(201).json(user)
        res.send({ code: code, result: result })
      } else {
        res.status(500)
        res.send({ code: 400, errors: ['wrong password or email'] })
      }
    }, email)
  } else {
    res.send({ code: 400, errors })
  }
}

exports.getRefreshToken = (req, res) => {
  // TODO
}
