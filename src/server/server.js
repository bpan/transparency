import express from 'express';
import RateLimit from 'express-rate-limit';
import path from 'path';
import mime from 'mime';
import serveStatic from 'serve-static';

import songs from './songs.js';

const app = express();

// Request rate limiting
var limiter = new RateLimit({
  windowMs: 1*60*1000, // 1 minute
  max: 500
});
app.set('trust proxy', 1);  // https://expressjs.com/en/guide/behind-proxies.html
app.use(limiter);

// Server API
app.use('/server/songs', songs);

// Client files
app.use('/assets', serveStatic(path.join(__dirname, '../client/assets')),
  function (req, res, next) {
    const type = mime.lookup(req.path);
    const charset = mime.charsets.lookup(type);
    res.setHeader('Content-Type', type + (charset ? '; charset=' + charset : ''));
    next();
});
app.get('/display.html', function (req, res, next) {
  // Display page
  res.sendFile(path.join(__dirname, '../client/display.html'));
});
app.use('/', function (req, res, next) {
  // All other urls
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(process.env.PORT, function() {
  console.log('Server app listening on port ' + process.env.PORT + '!');
});
