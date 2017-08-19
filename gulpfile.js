var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var connect = require('gulp-connect-php');
var imagemin = require('gulp-imagemin');
var cleanCSS = require('gulp-clean-css');
var browserify = require('gulp-browserify');
var nunjucksMd = require('gulp-nunjucks-md');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');

gulp.task('clean', function () {
    return del(['build']);
});

gulp.task('styles', function () {
    return gulp.src('template/styles/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({ compatibility: 'ie9' }))
        .pipe(gulp.dest('build/compiled'));
});

gulp.task('scripts', function () {
    return gulp.src('template/scripts/app.js')
        .pipe(browserify())
        .pipe(uglify()) // compress
        .pipe(gulp.dest('build/compiled'));
});

gulp.task('images', function () {
    return gulp.src('template/images/**/*.{png,jpg,gif}')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'));
});

gulp.task('public', function () {
    return gulp.src(['template/*', 'template/.*'], { nodir: true })
        .pipe(gulp.dest('build'));
});

gulp.task('content', function () {
    var manageEnvironment = function (env) {
        // Load all files from extensions directory
        // and execute with the "env" argument.
        require('require-all')({
            dirname: __dirname + '/extensions',
            filter: /\.js$/,
            resolve: function (ext) {
                return ext(env);
            }
        });
    };

    var config = require(__dirname + '/config.json');
    if (gulp.seq.indexOf('watch') >= 0) {
        // If running the "watch" task then change host to the "/"
        // (without this generated urls are incompatible with browsersync).
        config.host = '/';
    }

    return gulp.src('content/**/*.md')
        .pipe(nunjucksMd({
            path: 'template/views',
            manageEnv: manageEnvironment,
            data: config,
            block: 'markdown'
        }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('build'));
});

gulp.task('watch', function () {
    // First clean project and then build all resources parallel, at the end start
    // watching for changes and run browsersync (proxy via the built-in PHP server).
    runSequence('clean', ['styles', 'scripts', 'images', 'public', 'content'], function() {
        gulp.watch(['content/**/*.md', 'template/views/**/*.njk'], ['content']);
        gulp.watch('template/styles/**/*.scss', ['styles']);
        gulp.watch('template/scripts/**/*.js', ['scripts']);
        gulp.watch('template/images/**/*.{png,jpg,gif}', ['images']);
        gulp.watch(['template/*', 'template/.*'], ['public']);

        // Run built-in PHP server on 127.0.0.1:8000,
        // after this operation init the browsersync instance.
        connect.server({
            base: 'build/',
            router: 'build/router.php'
        }, function () {
            browserSync({
                proxy: '127.0.0.1:8000'
            });
        });

        // Perform browser reload whenever any of the files
        // in "template" or "content" directory will change.
        gulp.watch(['template/**/*', 'content/**/*']).on('change', function () {
            browserSync.reload();
        });
    });
});

gulp.task('default', function () {
    // First clean project and then build all resources parallel.
    runSequence('clean', ['styles', 'scripts', 'images', 'public', 'content']);
});
