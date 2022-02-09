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
  constructor(email, password) {
    this.email = email
    this.password = password
  }

  save(callback) {
    knex('users')
      .insert(this)
      .then((result) => {
        if (result) return callback(result, 200)
      })
      .catch((err) => {
        return callback(err, 500)
      })
  }

  static getUser(email, callback) {
    knex
      .select('id', 'email', 'password')
      .from('users')
      .where('email', email)
      //TODO: .first() or [user]
      .then(([user]) => {
        console.log('db result: ', user)
        if (user) return callback(user, 200)
      })
      .catch((err) => {
        return callback(err, 500)
      })
  }
}

module.exports = Note
