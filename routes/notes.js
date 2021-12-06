const express = require('express')
const router = express.Router()
const noteController = require('../controllers/notes-controller')

router.get('/', noteController.getNotes)
router.get('/:id', noteController.getNote)
router.post('/', noteController.addNote)
router.put('/:id', noteController.updateNote)
router.delete('/:id', noteController.deleteNote)

module.exports = router
