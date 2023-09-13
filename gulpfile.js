const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// Compile scss into css
function style() {
    // 1. Where is my scss file
    return gulp.src('./scss/**/*.scss')
        // 2. Pass that file through sass compiler
        .pipe(sass().on('error', sass.logError))
        // 3. Where do I save my compiled CSS?
        .pipe(gulp.dest('./css'))
        
        .pipe(browserSync.stream());
}

// Watch for changes in scss files
function watch() {
    browserSync.init({
        server:{
             baseDir: './'
        }
    });
    // Watch all .scss files in the 'scss' directory and its subdirectories
    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);

}

// Export the watch task as the default task
exports.default = watch;
