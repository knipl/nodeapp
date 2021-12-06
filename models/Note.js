let noteList = []

module.exports = class Note {
  constructor(desc) {
    this.description = desc
    this.id = (Math.random() + 1).toString(36).substring(7)
  }

  save() {
    noteList.push(this)
  }
  static get() {
    return noteList
  }
  getById(id) {
    return noteList
  }
}
