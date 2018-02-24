'use strict';
 
const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const exec = require('child_process').exec;
const nodemon = require('gulp-nodemon');

const buildDest = 'dist/';

gulp.task('clean', function(cb) {
  del(buildDest).then(function() {
    cb();
  });
});

gulp.task('webpack', function(cb) {
  exec('npx webpack', function (err, stdout, stderr) {
    cb(err);
  });
});

gulp.task('html', function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest(buildDest));
});

gulp.task('build', function(cb) {
  return runSequence.use(gulp)(
    ['webpack', 'html'],
    cb
  );
});

// Start a development node server
gulp.task('serve', ['build'], function() {
  nodemon({
    script: buildDest + 'server/server.bundle.js',
    watch: buildDest + 'server',
    ext: 'js',
    env: {
      'PORT': '3000',
      'DATABASE_URL': 'postgres://localhost/postgres'
    }
  });

  gulp.watch('src/**/*', ['build']);
});
        