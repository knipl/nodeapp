const fs = require('fs')

const getDataFromFile = (p, callback) => {
  fs.readFile(p, (error, data) => {
    if (!error) {
      callback(null, data)
    } else {
      console.err(error)
      return callback(error)
    }
  })
}

module.exports = getDataFromFile
