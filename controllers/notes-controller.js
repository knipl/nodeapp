const Note = require('../models/Note')

exports.getNotes = (req, res) => {
  res.send(Note.get())
}
exports.getNote = (req, res) => {
  res.send(mockNotes.filter((value) => value.id == req.params.id))
}
exports.addNote = (req, res) => {
  console.log(req.body)
  const newNote = new Note(req.body.text)
  newNote.save()
  res.send(200)
}
exports.updateNote = (req, res) => {
  mockNotes[mockNotes.findIndex((value) => value.id == req.params.id)].text =
    req.body.text
  res.send(mockNotes)
}
exports.deleteNote = (req, res) => {
  console.log(mockNotes.findIndex((value) => value.id == req.params.id))
  if (mockNotes.findIndex((value) => value.id == req.params.id) === -1) {
    var err = new Error('Something went wrong')
    next(err)
  }
  delete mockNotes[mockNotes.findIndex((value) => value.id == req.params.id)]
  res.send(mockNotes)
}
