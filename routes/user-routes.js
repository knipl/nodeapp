const express = require('express')
const res = require('express/lib/response')
const isAuth = require('../auth/is-auth')
const router = express.Router()
const userController = require('../controllers/auth-controller')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/home', isAuth, (req, res) => {
  res.send('Welcome! 🙌 ')
})

router.get('/refresh-token', isAuth, userController.getRefreshToken)

module.exports = router
