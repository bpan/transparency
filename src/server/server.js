const express = require('express')
const songs = require('./songs.js')

const app = express()

app.use('/server/songs', songs)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})