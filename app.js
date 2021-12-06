const express = require('express')
const app = express()
const port = 3000
const noteRoutes = require('./routes/notes')

app.use(express.json())
app.use('/notes', noteRoutes)

app.use('/', (req, res) => {
  res.send('Hello World!' + "<br><a href='/users'>Users</a>")
})

app.get('/users/:id', (req, res) => {
  res.send(
    "<a href='/'>Home</a><br> <a href='/users'>Back</a><br>" +
      'Hello Specific User #number ' +
      req.params.id +
      '. Welcome!'
  )
})

app.use(function (err, req, res, next) {
  res.status(500)
  res.send(err.message)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
