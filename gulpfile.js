var gulp = require('gulp');
var prefix = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var stripDebug = require('gulp-strip-debug');
var stylus = require('gulp-stylus');
var nib = require('nib');


// directories
var paths = {
    js: 'src/scripts/**/*.js',
    jsDest: 'static',
    styles: 'src/styles',
    stylesDest: 'static',
    html: 'templates',
    assets: 'src/assets'
}


gulp.task('scripts', function() {
  return gulp.src(paths.js)
    // Concatenate everything within the JavaScript folder.
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(paths.jsDest))
    .pipe(rename('scripts.min.js'))
    // Strip all debugger code out.
    // .pipe(stripDebug())
    // Minify the JavaScript.
    // .pipe(uglify())
    .pipe(gulp.dest(paths.jsDest));
});


//////////////////////////////
// Stylus Tasks
//////////////////////////////
gulp.task('styles', function () {
  gulp.src(paths.styles + '/main.styl')
    .pipe(stylus({
      paths:  ['node_modules'],
      import: ['nib'],
      use: [nib()],
      'include css': true
    }))
    .pipe(concat('main.css'))
    .pipe(gulp.dest(paths.stylesDest))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(paths.stylesDest))
});


//////////////////////////////
// Copy assets
//////////////////////////////
gulp.task('assets', function () {
    gulp.src('src/assets/**/*')
        .pipe(gulp.dest('build/assets'));
});


//////////////////////////////
// Watch
//////////////////////////////
gulp.task('watch', function () {
  gulp.watch(paths.js, ['scripts']);
  gulp.watch(paths.assets  + '/**/*', ['assets']);
  gulp.watch(paths.styles + '/**/*.styl', ['styles']);
});
