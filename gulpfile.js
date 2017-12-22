/** PACKAGES */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    gutil = require('gulp-util');


/** TASKS */

//	SCSS
gulp.task('scss', function () {
    return gulp.src('./src/sass/style.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [
                './node_modules/bootstrap-sass/assets/stylesheets'
            ],
            errLogToConsole: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./src/'));
});

// JS BUNDLE
gulp.task('js-bundle', function () {

    var b = browserify({
        entries: './src/js/scripts.js', //source js file
        debug: true
    });

    return b.bundle()
        .pipe(source('scripts.bundle.js')) //output bundle file name
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./src/js/'));
});


/** PORCELAIN TASKS */

/* DEFAULT */
gulp.task('default', function () {
    gulp.watch('./src/sass/**/*.scss', ['scss']);
    gulp.watch('./src/js/scripts.js', ['js-bundle']);
});

/* BUILD */
gulp.task('build', ['scss', 'js-bundle']);