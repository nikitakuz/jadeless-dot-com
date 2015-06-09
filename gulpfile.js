var gulp = require('gulp');
var jade = require('gulp-jade');
var less = require('gulp-less');

var SRC = './client/src/';
var VENDOR = SRC + 'vendor/';
var DIST = './client/dist/';

var paths = {
  jade: [SRC + '**/*.jade', '!' + VENDOR],
  less: [SRC + '**/*.less', '!' + VENDOR]
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

gulp.task('build', ['jade', 'less']);

gulp.task('watch', ['build'], function() {
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.less, ['less']);
});

gulp.task('default', ['watch']);