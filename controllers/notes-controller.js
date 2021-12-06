const Note = require('../models/Note')

exports.getNotes = (req, res) => {
  res.send(Note.get())
}
exports.getNote = (req, res) => {
  res.send(Note.getById(req.params.id))
}
exports.addNote = (req, res) => {
  console.log(req.body)
  const newNote = new Note(req.body.text)
  newNote.save()
  res.sendStatus(200)
}
// exports.updateNote = (req, res) => {
//   mockNotes[mockNotes.findIndex((value) => value.id == req.params.id)].text =
//     req.body.text
//   res.send(mockNotes)
// }
exports.deleteNote = (req, res) => {
  Note.deleteById(req.params.id)
  res.sendStatus(200)
}
