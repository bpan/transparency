'use strict';
 
const gulp = require('gulp')
const del = require('del')
const runSequence = require('run-sequence')
const sass = require('gulp-sass')
const filesExist = require('files-exist')
const nodemon = require('gulp-nodemon')
const vendorFiles = require('./vendor.js')
const _ = require('lodash')

const clientSrc = 'src/client/'
const serverSrc = 'src/server/'
const buildDest = 'dist/'

gulp.task('clean', function(cb) {
    del(buildDest).then(function() {
        cb()
    });
})

gulp.task('sass', function() {
  return gulp.src(clientSrc + 'scss/*')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(buildDest + 'client/css'))
})

gulp.task('vendor', function() {
    return gulp.src(filesExist(_.map(vendorFiles, filename => 'node_modules/' + filename)))
        .pipe(gulp.dest(buildDest + 'client/vendor'))
})

gulp.task('client', ['sass', 'vendor'], function() {
  return gulp.src([clientSrc + '**/*', '!' + clientSrc + 'scss', '!' + clientSrc + 'scss/**/*'])
    .pipe(gulp.dest(buildDest + 'client/'))
})

gulp.task('server', function() {
  return gulp.src([serverSrc + '**/*'])
    .pipe(gulp.dest(buildDest + 'server/'))
})

gulp.task('compile', function(cb) {
    return runSequence.use(gulp)(
        'clean',
        ['client', 'server'],
        cb
    )
})

// Start the node server
gulp.task('serve', ['compile'], function() {
  nodemon({
    script: buildDest + 'server/server.js',
    watch: buildDest + 'server',
    ext: 'js',
    env: {
      'SERVER_PORT': '3000',
      'REDIS_URL': 'redis://127.0.0.1:6379'
    }
  });

  gulp.watch([clientSrc + '**/*'], ['client']);
  gulp.watch([serverSrc + '**/*'], ['server']);
});
        