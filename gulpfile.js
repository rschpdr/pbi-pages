'use strict';

var gulp = require('gulp');
var HubRegistry = require('gulp-hub');
var browserSync = require('browser-sync');

// load some files into the registry
var hub = new HubRegistry(['./gulp/tasks/*.js']);

// tell gulp to use the tasks just loaded
gulp.registry(hub);

// define composite tasks

gulp.task('watch', () => {
  gulp.watch('./app/*.html', { ignoreInitial: false }, done => {
    browserSync.reload();
    done();
  });
  gulp.watch(
    './app/assets/styles/**/*.css',
    { ignoreInitial: false },
    gulp.series('styles', 'cssInject')
  );
  gulp.watch(
    './app/assets/scripts/**/*.js',
    { ignoreInitial: false },
    gulp.series('modernizrTask', 'scripts', done => {
      browserSync.reload();
      done();
    })
  );
});

exports.watch = gulp.parallel('server', 'watch');

exports.icons = gulp.series(
  'beginClean',
  'createSprite',
  'createPngCopy',
  gulp.parallel('copySpriteGraphic', 'copySpriteCSS'),
  'endClean'
);

exports.build = gulp.series(
  'icons',
  'deleteDistFolder',
  gulp.parallel(
    'copyGeneralFiles',
    'optmizeImages',
    gulp.series('styles', 'scripts', 'usemin')
  ),
  'previewDist'
);
