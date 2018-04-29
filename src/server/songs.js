const Router = require('express-promise-router');
const bodyParser = require('body-parser');
const router = new Router();
router.use(bodyParser.json());

const { Pool } = require('pg');
const db = new Pool({
  connectionString: process.env.DATABASE_URL
});

const tenantId = 1;

// db.on('error', function (err) {
//   console.log('Error ' + err)
// })

router.route('/')
.get(async (req, res) => {
  const { rows } = await db.query('SELECT * from song WHERE tenant_id = $1', [tenantId]);
  res.send(rows)
});
// .post(async(req, res) => {
//     const newId = await client.hincrbyAsync(key, maxIdField, 1)
//     await client.hsetAsync(key, newId, JSON.stringify(req.body))
//     res.send({ 'song_id' : newId })
// })

router.route('/:id')
.get(async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query('SELECT * from song WHERE tenant_id = $1 AND song_id = $2', [tenantId, id]);
  res.send(rows[0])
})
// .put()
.delete(async (req, res) => {
  const { id } = req.params;
  const song = await db.query('DELETE from song WHERE tenant_id = $1 AND song_id = $2', [tenantId, id])
});

module.exports = router;

