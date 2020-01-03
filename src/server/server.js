import express from 'express';
import path from 'path';

import songs from './songs.js';

const app = express();

app.use('/server/songs', songs);

app.use('/assets', express.static(path.join(__dirname, '../client/assets')));
app.get('/display.html', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../client/display.html'))
});
app.use('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../client/index.html'))
});

app.listen(process.env.PORT, function() {
  console.log('Server app listening on port ' + process.env.PORT + '!');
});
