var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var cleanCSS = require('gulp-clean-css');
var browserify = require('gulp-browserify');
var nunjucksMd = require('gulp-nunjucks-md');
var runSequence = require('run-sequence');

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
    return gulp.src('template/*', { nodir: true })
        .pipe(gulp.dest('build'));
});

gulp.task('content', function () {
    var manageEnvironment = function (env) {
        // Load all files from extensions directory
        // and execute with the "env" argument.
        require('require-all')({
            dirname: __dirname +'/extensions',
            filter: /\.js$/,
            resolve: function (ext) {
                return ext(env);
            }
        });
    };

    return gulp.src('content/**/*.md')
        .pipe(nunjucksMd({
            path: 'template/views',
            manageEnv: manageEnvironment,
            data: 'config.json',
            block: 'markdown'
        }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('build'));
});

gulp.task('watch', function () {
    gulp.watch(['content/**/*.md', 'template/views/**/*.njk'], ['content']);
    gulp.watch('template/styles/**/*.scss', ['styles']);
    gulp.watch('template/scripts/**/*.js', ['scripts']);
    gulp.watch('template/images/**/*.{png,jpg,gif}', ['images']);
    gulp.watch('template/*', ['public']);
});

gulp.task('default', function () {
    runSequence('clean', ['styles', 'scripts', 'images', 'public', 'content']);
});
