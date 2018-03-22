const gulp = require('gulp'),
  umd = require('gulp-umd');

gulp.task('umd', function() {
  return gulp.src('src/*.js')
    .pipe(umd({
      exports: function (file) {
        return 'classNames';
      }
    }))
    .pipe(gulp.dest('lib'));
});