const Note = require('../models/NoteModel')

exports.getNotes = (req, res) => {
  Note.get((result) => {
    res.send(result)
  })
}
exports.getNote = (req, res) => {
  Note.getById(req.params.id, (result) => {
    res.send(result)
  })
}
exports.addNote = (req, res) => {
  const newNote = new Note(req.body.text)
  newNote.save((payload, result) => {
    console.log(payload)
    res.sendStatus(result)
  })
}
exports.updateNote = (req, res) => {
  Note.updateNote(req.params.id, req.body.text, (result) => {
    res.sendStatus(result)
  })
}
exports.deleteNote = (req, res) => {
  Note.deleteById(req.params.id, (result) => {
    res.sendStatus(result)
  })
}
