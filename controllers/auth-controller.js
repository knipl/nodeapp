const { validateRegData, validateLoginData, hashPw } = require('../auth/auth')
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')

exports.register = (req, res) => {
  console.log('hi')
  if (validateRegData(req.body)) {
    const newUser = new User(req.body.email, hashPw(req.body.password))
    newUser.save((result) => {
      res.send(result)
    })
  } else res.sendStatus(500)
}

exports.login = (req, res) => {
  const errors = validateLoginData(req.body)
  if (!errors.length) {
    const email = req.body.email
    const password = req.body.password
    User.getUser((result, code) => {
      const user = result[0]
      if (user) {
        const [hashedPassword, salt] = user.password.split('.')
        if (hashedPassword === hashPw(password)) {
          console.log('email, password ok')
          // Create token
          const token = jwt.sign(
            { user_id: user.id, email },
            'THISISMYTOKENKEY',
            {
              expiresIn: '2m',
            }
          )
          // save user token
          user.token = token

          // return new user
          res.status(201).json(user)
          res.send({ code: code, result: result })
        }
      } else {
        console.log(result)
        res.status(500)
        res.send({ code: code, result: result })
      }
    }, email)
  } else {
    res.send(errors)
  }
}

exports.getRefreshToken = (req, res) => {
  // TODO
}
