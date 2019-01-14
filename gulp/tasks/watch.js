var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('server', () => {
  browserSync.init({
    notify: false,
    server: {
      baseDir: 'app'
    }
  });
});

gulp.task('cssInject', () => {
  return gulp.src('./app/temp/styles/styles.css').pipe(browserSync.stream());
});
