const { kStringMaxLength } = require('buffer')
const fs = require('fs')
const path = require('path')
const p = path.join(path.dirname(require.main.filename), 'assets', 'data.json')
const getDataFromFile = require('../helpers/getDataFromFile')

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'nodeApp',
  },
})

class Note {
  constructor(desc) {
    this.description = desc
  }

  save(callback) {
    knex('notes')
      .insert(this)
      .then((result) => {
        if (result) return callback(200)
      })
      .catch((err) => {
        return callback(500)
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
