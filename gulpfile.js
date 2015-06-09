var gulp = require('gulp');
var jade = require('gulp-jade');

var SRC = './client/src/';
var BUILD = './client/dist/';

var paths = {
  jade: SRC + '**/*.jade'
};

gulp.task('jade', function() {
  return gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest(BUILD));
});

gulp.task('build', ['jade']);

gulp.task('watch', ['build'], function() {
  gulp.watch(paths.jade, ['jade'])
});

gulp.task('default', ['watch']);