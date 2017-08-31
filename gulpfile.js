var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var htmlmin = require('gulp-htmlmin');
var connect = require('gulp-connect-php');
var imagemin = require('gulp-imagemin');
var cleanCSS = require('gulp-clean-css');
var browserify = require('gulp-browserify');
var nunjucksMd = require('gulp-nunjucks-md');
var frontmatter = require('frontmatter');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var markdownToJSON = require('gulp-markdown-to-json');

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
    return gulp.src('template/images/**/*.{png,jpg,gif,svg}')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'));
});

gulp.task('libraries', function () {
	var relFiles = require('./template/libraries/.export.js');
	var absFiles = relFiles.map(function(f) {
	    return 'template/libraries/' + f;
    });

    return gulp.src('template/libraries/**/*')
        .pipe(filter(absFiles))
        .pipe(gulp.dest('build/libraries'));
});

gulp.task('public', function () {
    return gulp.src(['template/*', 'template/.*'], { nodir: true })
        .pipe(gulp.dest('build'));
});

gulp.task('indexes', function () {
    var transform = function (data, file) {
        // Remove keys which can contain markdown content
        // (search only through the metadata to improve performance)
        delete data.data;
        delete data.content;
        delete data.body;

        // Flatten json structure by modifying file path.
        var baseDir = __dirname +'/content/';
        var relativePath = file.path.substr(baseDir.length);
        file.path = baseDir + relativePath.replace(/[\\/]/g, '~');

        // Append url associated with the markdown to the output data
        // (unify directory separator and remove .md extension).
        data.url = relativePath.replace(/[\\/]/g, '/').slice(0, -3);
        data.url = data.url === 'index' ? '/' : data.url;

        return data;
    };

    return gulp.src('content/**/*.md')
        .pipe(gutil.buffer())
        .pipe(markdownToJSON(frontmatter, 'indexes.json', transform))
        .pipe(gulp.dest('build/compiled'))
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

    var config = require(__dirname + '/app.json');
    if (gulp.seq.indexOf('watch') >= 0) {
        // If running the "watch" task then change host to the "/"
        // (without this generated urls are incompatible with browsersync).
        config.host = '/';
    }

    return gulp.src('content/**/*.md')
        .pipe(nunjucksMd({
            path: 'template/views',
            manageEnv: manageEnvironment,
            data: { app: config },
            block: 'markdown'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyJS: true
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('watch', function () {
    // First clean project and then build all resources parallel, at the end start
    // watching for changes and run browsersync (proxy via the built-in PHP server).
    runSequence('clean', ['styles', 'scripts', 'images', 'libraries', 'public', 'indexes'], 'content', function () {
        var reloadAfterTasks = function(tasks) {
            return function() {
                runSequence(tasks, function () { browserSync.reload() });
            };
        };

        // Triggered watch will perform specified task(s) and reload the page
        // when the specified task ends successfully (achieved via reloadAfterTasks).
        gulp.watch(['content/**/*.md'], reloadAfterTasks('indexes'));
        gulp.watch(['content/**/*.md', 'template/views/**/*.njk'], reloadAfterTasks('content'));
        gulp.watch(['template/styles/**/*.scss'], reloadAfterTasks('styles'));
        gulp.watch(['template/scripts/**/*.js'], reloadAfterTasks('scripts'));
        gulp.watch(['template/images/**/*.{png,jpg,gif,svg}'], reloadAfterTasks('images'));
        gulp.watch(['template/*', 'template/.*'], reloadAfterTasks('public'));

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
    });
});

gulp.task('default', function () {
    // First clean project and then build all resources parallel.
    runSequence('clean', ['styles', 'scripts', 'images', 'libraries', 'public', 'indexes'], 'content');
});
