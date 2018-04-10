const gulp = require('gulp'),
    babel = require("gulp-babel"),
    umd = require('gulp-umd');

gulp.task('umd', function() {
    return gulp.src('src/*.js')
        .pipe(babel())
        .pipe(umd({
            exports: function (file) {
                return 'classNames';
            }
        }))
        .pipe(gulp.dest('lib'));
});