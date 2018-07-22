'use strict';

var gulp = require('gulp');
var gulpSequence = require('gulp-sequence')
let cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var minifycss = require('gulp-clean-css');
var concat = require('gulp-concat');

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

gulp.task('scripts', function() {
  return gulp.src(['./assets/js/jquery/jquery-3.3.1.min.js', './assets/js/core/*.js', './assets/js/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('develop', gulpSequence('sass', 'minifycss', 'scripts'));
