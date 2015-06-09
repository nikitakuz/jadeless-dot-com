var gulp = require('gulp');
var jade = require('gulp-jade');
var less = require('gulp-less');
var jshint = require('gulp-jshint');


var SRC = './client/src/';
var VENDOR = SRC + 'vendor/';
var DIST = './client/dist/';

var paths = {
  jade: [SRC + '**/*.jade', '!' + VENDOR + '**/*.jade'],
  less: [SRC + '**/*.less', '!' + VENDOR + '**/*.less'],
  scripts: [SRC + '**/*.js', '!' + VENDOR + '**/*.js']
};

gulp.task('jade', function() {
  return gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest(DIST));
});

gulp.task('less', function() {
  return gulp.src(paths.less)
    .pipe(less())
    .pipe(gulp.dest(DIST));
});

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', ['lint'], function() {
  return gulp.src(paths.scripts)
    .pipe(gulp.dest(DIST))
});

gulp.task('build', ['jade', 'less', 'scripts']);

gulp.task('watch', ['build'], function() {
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['watch']);