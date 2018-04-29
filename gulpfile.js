'use strict';

const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack');
const nodemon = require('gulp-nodemon');

const buildDest = 'dist/';
const webpackConfigLocations = {
  'dev': './webpack.config.dev',
  'prod': './webpack.config.prod'
};
let webpackConfig = webpackConfigLocations.prod;

gulp.task('clean', function (done) {
  del(buildDest).then(function () {
    done();
  });
});

gulp.task('build:webpack', function (done) {
  webpack(require(webpackConfig)).run((err, stats) => {
    if (err) {
      console.log(err, stats);
      throw err;
    }

    if (stats.hasErrors()) {
      console.error(`Error: webpack`);
      throw new Error(`Error: webpack`);
    }

    done();
  });
});

gulp.task('build:html', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest(buildDest));
});

// Production build
gulp.task('build', gulp.parallel(['build:webpack', 'build:html']));


gulp.task('set:dev', function (done) {
  webpackConfig = webpackConfigLocations.dev;
  done();
});

gulp.task('build:dev', gulp.series(['set:dev', 'build']));

const buildAndStartDevServer = gulp.series([
  'build:dev',
  function (done) {
    nodemon({
      script: buildDest + 'server/server.bundle.js',
      watch: buildDest + 'server',
      ext: 'js',
      env: {
        'PORT': '5000',
        'DATABASE_URL': 'postgres://localhost/postgres'
      }
    });

    gulp.watch('src/**/*', gulp.series(['build']));

    done();
  }
]);

gulp.task('serve', buildAndStartDevServer);

gulp.task('default', buildAndStartDevServer);