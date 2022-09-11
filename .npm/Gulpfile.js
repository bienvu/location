/*jslint indent: 2 */
'use strict';

var gulp = require('gulp'),
  postcss = require('gulp-postcss'),
  sass = require('gulp-sass')(require('sass')),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  watch = require('gulp-watch'),
  clean = require('gulp-clean'),
  src = {
    scss: '../scss/**/*.scss',
    css: '../css',
  };

gulp.task('clean', function () {
  return gulp.src('../css/styles.css', {
      read: false,
      allowEmpty: true
    })
    .pipe(clean({force: true}));
});

gulp.task('styles', gulp.parallel('clean', function(){
  return gulp.src('../scss/{,*/}*.{scss,sass}', {
      allowEmpty: true
    })
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({ cascade: true }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(src.css));
}));

gulp.task('watch', gulp.parallel('styles', function(){
  gulp.watch(src.scss, gulp.series(['styles']));
}));

gulp.task('default', gulp.parallel('styles'));
