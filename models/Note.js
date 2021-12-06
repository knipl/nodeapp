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
  static getById(id) {
    return noteList.filter((value) => {
      return value.id === id
    })
  }

  static deleteById(id) {
    if (noteList.findIndex((value) => value.id == id) === -1) {
      var err = new Error('Something went wrong')
      next(err)
    }
    delete noteList[noteList.findIndex((value) => value.id == id)]
  }
}
