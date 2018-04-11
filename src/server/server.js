import express from 'express';
import songs from './songs.js';
import path from 'path';

const app = express();

app.use('/server/songs', songs);

app.use(express.static(path.join(__dirname, '../client')));

app.listen(process.env.PORT, function() {
  console.log('Server app listening on port ' + process.env.PORT + '!');
});
