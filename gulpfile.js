var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var watch = require('gulp-watch');

gulp.task('build-angular-modules', function() {
  ['controllers', 'directives', 'components', 'services'].forEach(function(directory) {
    gulp.src('./assets/' + directory + '/*.js')
    .pipe(concat(directory + '.js'))
    .pipe(gulp.dest('./assets/js'))
    .pipe(uglify())
    .pipe(rename(directory + '.min.js'))
    .pipe(gulp.dest('./assets/js'));
  });
});

gulp.task('watch-angular-modules', function() {
  gulp.watch([
    './assets/controllers/*.js',
    './assets/directives/*.js',
    './assets/components/*.js',
    './assets/services/*.js'
  ], [
    'build-angular-modules'
  ]);
});

gulp.task('default', ['build-angular-modules', 'watch-angular-modules']);