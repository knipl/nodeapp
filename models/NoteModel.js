const fs = require('fs')
const path = require('path')
const p = path.join(path.dirname(require.main.filename), 'assets', 'data.json')
const getDataFromFile = require('../helpers/getDataFromFile')

class Note {
  constructor(desc) {
    this.description = desc
    this.id = (Math.random() + 1).toString(36).substring(7)
  }

  save(callback) {
    getDataFromFile(p, (error, result) => {
      if (error) return callback(500)
      let notes = JSON.parse(result)
      notes.push(this)
      fs.writeFile(p, JSON.stringify(notes), (error) => {
        console.err(error)
        if (error) return callback(500)
        return callback(200)
      })
    })
  }
  static get(callback) {
    getDataFromFile(p, (error, result) => {
      if (error) return callback(500)
      return callback(JSON.parse(result))
    })
  }
  static getById(id, callback) {
    getDataFromFile(p, (error, result) => {
      if (error) return callback(500)
      const response = JSON.parse(result)
      const filteredById = response.filter((value) => {
        return value.id === id
      })

      return filteredById.length ? callback(filteredById) : callback(404)
    })
  }

  static updateNote(id, payload, callback) {
    getDataFromFile(p, (error, result) => {
      if (error) return callback(500)
      let notes = JSON.parse(result)
      notes[notes.findIndex((value) => value.id === id)].description = payload
      fs.writeFile(p, JSON.stringify(notes), (error) => {
        if (error) return callback(500)
        return callback(200)
      })
    })
  }

  static deleteById(id, callback) {
    getDataFromFile(p, (error, result) => {
      if (error) next(error)
      let notes = JSON.parse(result)
      if (notes.findIndex((value) => value.id == id) === -1) {
        var err = new Error('not found')
        callback(404)
        throw err
      }
      notes.splice(
        notes.findIndex((value) => value.id == id),
        1
      )
      fs.writeFile(p, JSON.stringify(notes), (error) => {
        if (error) return callback(500)
        return callback(200)
      })
    })
  }
}

module.exports = Note
