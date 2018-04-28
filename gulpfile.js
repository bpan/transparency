'use strict';

const gulp = require('gulp');
const del = require('del');
const nodemon = require('gulp-nodemon');

const webpackConfig = require(process.env.WEBPACK_CONFIG || './webpack.config.dev');
const webpack = require('webpack');

const buildDest = 'dist/';

gulp.task('clean', function(cb) {
  del(buildDest).then(function() {
    cb();
  });
});

gulp.task('webpack', function(cb) {
  webpack(webpackConfig).run((err, stats) => {
    if (err) {
      console.log(err, stats);
      throw err;
    }

    if (stats.hasErrors()) {
      console.error(`Error: webpack`);
      throw new Error(`Error: webpack`);
    }

    cb();
  });
});

gulp.task('html', function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest(buildDest));
});

gulp.task('build', gulp.series(['webpack', 'html']));

// Start a development node server
gulp.task('serve', gulp.series([
  'build',
  function() {
    nodemon({
      script: buildDest + 'server/server.bundle.js',
      watch: buildDest + 'server',
      ext: 'js',
      env: {
        'PORT': '3000',
        'DATABASE_URL': 'postgres://localhost/postgres'
      }
    });

    gulp.watch('src/**/*', gulp.series(['build']));
  }
]));
