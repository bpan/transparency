import express from 'express';
import path from 'path';

import songs from './songs.js';

const app = express();

app.use('/server/songs', songs);

app.use(express.static(path.join(__dirname, '../client')));

app.listen(process.env.PORT, function() {
  console.log('Server app listening on port ' + process.env.PORT + '!');
});
