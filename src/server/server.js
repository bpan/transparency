import express from 'express';
import path from 'path';
import mime from 'mime';

import songs from './songs.js';

const app = express();

// Server
app.use('/server/songs', songs);

// Client assets
app.use('/assets', express.static(path.join(__dirname, '../client/assets')),
  function (req, res, next) {
    if (!res.getHeader('content-type')) {
      const type = mime.lookup(req.path);
      const charset = mime.charsets.lookup(type);
      res.setHeader('Content-Type', type + (charset ? '; charset=' + charset : ''));
    }
    next();
});
// Client display page
app.get('/display.html', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../client/display.html'));
});
// All other client urls
app.use('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(process.env.PORT, function() {
  console.log('Server app listening on port ' + process.env.PORT + '!');
});
