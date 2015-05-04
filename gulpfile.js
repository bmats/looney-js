var gulp = require('gulp'),
  concat = require('gulp-concat'),
  header = require('gulp-header'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify');

gulp.task('main', function() {
  var pkg = require('./package.json');
  return gulp.src('src/looney.js')
    .pipe(uglify())
    .pipe(header(
      '/**\n' +
      ' * <%= pkg.name %>\n' +
      ' * @version v<%= pkg.version %>\n' +
      ' * @link <%= pkg.homepage %>\n' +
      ' * @license <%= pkg.license %>\n' +
      ' */\n',
      { pkg: pkg }))
    .pipe(rename(function (path) {
      path.extname = '.min.js'
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('bookmarklet', function() {
  return gulp.src(['src/looney.js', 'src/bookmarklet.js'])
    .pipe(concat('bookmarklet.js'))
    .pipe(uglify())
    .pipe(header('javascript:'))
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['main', 'bookmarklet']);
