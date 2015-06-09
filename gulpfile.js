var gulp = require('gulp');
var jade = require('gulp-jade');
var less = require('gulp-less');

var SRC = './client/src/';
var BUILD = './client/dist/';

var paths = {
  jade: SRC + '**/*.jade',
  less: SRC + '**/*.less'
};

gulp.task('jade', function() {
  return gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest(BUILD));
});

gulp.task('less', function() {
  return gulp.src(paths.less)
    .pipe(less())
    .pipe(gulp.dest(BUILD));
});

gulp.task('build', ['jade', 'less']);

gulp.task('watch', ['build'], function() {
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.less, ['less']);
});

gulp.task('default', ['watch']);