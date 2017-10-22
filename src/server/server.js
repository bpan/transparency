const express = require('express')
const songs = require('./songs.js')
const path = require('path');

const app = express()

app.use('/server/songs', songs)

app.use(express.static(path.join(__dirname, '../client')))

app.listen(process.env.SERVER_PORT, function () {
  console.log('Server app listening on port ' + process.env.SERVER_PORT + '!')
})

