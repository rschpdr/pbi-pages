var gulp = require('gulp'),
  imagemin = require('gulp-imagemin'),
  del = require('del'),
  usemin = require('gulp-usemin'),
  rev = require('gulp-rev'),
  cssnano = require('gulp-cssnano'),
  uglify = require('gulp-uglify'),
  htmlmin = require('gulp-htmlmin'),
  browserSync = require('browser-sync').create();

const DIST_DIR = 'docs';

gulp.task('previewDist', () => {
  browserSync.init({
    notify: false,
    server: {
      baseDir: DIST_DIR
    }
  });
});

gulp.task('deleteDistFolder', () => {
  return del([
    `./${DIST_DIR}/assets/images/**`,
    `./${DIST_DIR}/assets/styles/**`,
    `./${DIST_DIR}/assets/scripts/**`,
    `!./${DIST_DIR}/assets/files/**/*`
  ]);
});

gulp.task('copyGeneralFiles', () => {
  var pathsToCopy = [
    './app/**/*',
    '!./app/assets/images/**',
    '!./app/assets/styles/**',
    '!./app/assets/scripts/**',
    '!./app/temp',
    '!./app/temp/**'
  ];
  return gulp.src(pathsToCopy).pipe(gulp.dest(`./${DIST_DIR}`));
});

gulp.task('optmizeImages', () => {
  return gulp
    .src([
      './app/assets/images/**/*',
      '!./app/assets/images/icons',
      '!./app/assets/images/icons/**/*'
    ])
    .pipe(
      imagemin({
        progressive: true,
        interlaced: true,
        multipass: true
      })
    )
    .pipe(gulp.dest(`./${DIST_DIR}/assets/images`));
});

gulp.task('usemin', () => {
  return gulp
    .src('./app/*.html')
    .pipe(
      usemin({
        css: [
          function() {
            return rev();
          },
          function() {
            return cssnano();
          }
        ],
        js: [
          function() {
            return rev();
          },
          function() {
            return uglify().on('error', function(e) {
              console.log(e);
            });
          }
        ],
        html: [
          function() {
            return htmlmin({
              collapseWhitespace: true,
              removeComments: true
            });
          }
        ]
      })
    )
    .pipe(gulp.dest(`./${DIST_DIR}`));
});
