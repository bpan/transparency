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
const buildDest = 'gulp/' // Deprecated

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

gulp.task('fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest(buildDest + 'client/fonts'))
})

gulp.task('vendor', function() {
    return gulp.src(filesExist(_.map(vendorFiles, filename => 'node_modules/' + filename)))
        .pipe(gulp.dest(buildDest + 'client/vendor'))
})

gulp.task('client', ['sass', 'fonts', 'vendor'], function() {
  return gulp.src([clientSrc + '**/*', '!' + clientSrc + 'scss', '!' + clientSrc + 'scss/**/*'])
    .pipe(gulp.dest(buildDest + 'client/'))
})

gulp.task('server', function() {
  return gulp.src([serverSrc + '**/*'])
    .pipe(gulp.dest(buildDest + 'server/'))
})

gulp.task('compile', function(cb) {
    return runSequence.use(gulp)(
        // 'clean',
        ['client', 'server'],
        cb
    )
})

// Start a development node server
gulp.task('serve', function() {
  nodemon({
    script: 'dist/server/server.bundle.js',
    watch: 'dist/server',
    ext: 'js',
    env: {
      'PORT': '3000',
      'DATABASE_URL': 'postgres://localhost/postgres'
    }
  });

  // gulp.watch([clientSrc + '**/*'], ['client']);
  // gulp.watch([serverSrc + '**/*'], ['server']);
});
        