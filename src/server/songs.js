const Router = require('express-promise-router')
const bodyParser = require('body-parser')
const router = new Router()
router.use(bodyParser.json())

const redis = require("redis")
const bluebird = require("bluebird")
bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const client = redis.createClient(process.env.REDIS_URL)
const namespace = 'songs'
const tenantId = 'default-user'
const key = namespace + ':' + tenantId
const maxIdField = 'maxSongId'

client.on("error", function (err) {    
    console.log("Error " + err)
})

router.route('/')
.get(async (req, res) => {
    const songs = await client.hgetallAsync(key)
    delete songs[maxIdField]
    res.send(songs)
})
.post(async(req, res) => {
    const newId = await client.hincrbyAsync(key, maxIdField, 1)
    await client.hsetAsync(key, newId, JSON.stringify(req.body))
    res.send({ 'song_id' : newId })
})

router.route('/:id')
.get(async (req, res) => {
    const { id } = req.params
    const song = await client.hgetAsync(key, id)
    res.send(song)
})
// .put()
.delete(async (req, res) => {
    const { id } = req.params
    const song = await client.hdelAsync(key, id)
    res.send()
})

module.exports = router

