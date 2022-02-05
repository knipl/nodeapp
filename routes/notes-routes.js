const express = require('express')
const isAuth = require('../auth/is-auth')
const router = express.Router()
const noteController = require('../controllers/notes-controller')

router.get('/', noteController.getNotes)
router.get('/:id', isAuth, noteController.getNote) // védett route
router.post('/', noteController.addNote)
router.put('/:id', noteController.updateNote)
router.delete('/:id', noteController.deleteNote)

module.exports = router
