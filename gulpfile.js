'use strict';
let gulp         = require('gulp'),
    stylus       = require('gulp-stylus'),
    autoprefixer = require('autoprefixer-stylus'),
    rupture      = require('rupture'),
    browserSync  = require('browser-sync').create(),
    imagemin     = require('gulp-imagemin')

const supportedBrowsers = {browsers:['last 2 versions', 'Android >= 5', 'IE >= 9']};

gulp.task('style', function () {
  let config = {
    'include css': true,
    'use': [rupture(), autoprefixer(supportedBrowsers)],
    'compress': true
  };

  return gulp.src('./src/styl/main.styl')
    .pipe(stylus(config))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('image', function () {
  gulp.src('./src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img/'))
});

gulp.task('js', function () {
  gulp.src('./src/js/**/*')
      .pipe(gulp.dest('./dist/js/'))
});

gulp.task('serve', ['js', 'image', 'style'], function() {
  browserSync.init({
    open: false,
    port: 3001,
    notify: true,
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("./*.html").on('change', browserSync.reload);
  gulp.watch("./src/img/**/*", ['image']).on('change', browserSync.reload);
  gulp.watch("./src/styl/*.styl", ['style']).on('change', browserSync.reload);
});



gulp.task('default', ['serve']);
