import * as express from 'express'
import * as songs from './songs.js'
import * as path from 'path'

const app = express()

app.use('/server/songs', songs)

app.use(express.static(path.join(__dirname, '../client')))

app.listen(process.env.PORT, function () {
  console.log('Server app listening on port ' + process.env.PORT + '!')
})

