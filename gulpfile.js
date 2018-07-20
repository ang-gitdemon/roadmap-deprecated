'use strict';

var gulp = require('gulp');
var gulpSequence = require('gulp-sequence')
let cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var minifycss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pump = require('pump');


gulp.task('sass', function () {
  return gulp.src('./assets/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('minifycss', () => {
  return gulp.src('./assets/css/style.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./'));
});

gulp.task('compress', function (cb) {
  pump([
        gulp.src('./assets/js/*.js'),
        uglify(),
        gulp.dest('./dist/js')
    ],
    cb
  );
});

gulp.task('develop', gulpSequence('sass', 'minifycss', 'compress'));
