var gulp = require('gulp'),
    watch = require('gulp-watch'),
    util = require('gulp-util'),
    changed = require('gulp-changed'),
    sequence = require('run-sequence'),
    injectReload = require('gulp-inject-reload'),
    bower = require('gulp-bower'),
    express = require('express');

var SRC = './app/',
    DIST = './dist/',
    PORT = 4000,
    LIVERELOAD_PORT = 35729;
//build, components


gulp.task('build', ['components'], function() {
    gulp.src([SRC + '**/*.*', SRC + '!components'])
        .pipe(changed(DIST))
        .pipe(gulp.dest(DIST));
    return gulp.src([SRC + '*.*', SRC + '!components'])
        .pipe(changed(DIST))
        .pipe(gulp.dest(DIST));
})


gulp.task('devBuild', ['components'], function() {
    gulp.src([SRC + '**/*.*', SRC + '!components'])
        .pipe(changed(DIST))
        .pipe(gulp.dest(DIST));
    gulp.src([SRC + 'index.js'])
        .pipe(changed(DIST + 'app'))
        .pipe(gulp.dest(DIST));
    return gulp.src(SRC + 'index.html')
        .pipe(injectReload({
            port: LIVERELOAD_PORT,
            host: 'http://" + (location.host || "localhost").split(":")[0] + "',
            script: 'livereload.js',
            snipver: 1
        }))
        .pipe(gulp.dest(DIST));
})


gulp.task('components', function() {
    return sequence('bower', 'copycomponents');
})


gulp.task('copycomponents', function() {
    return gulp.src([
            SRC + 'components/angular/angular.min.js',
            SRC + 'components/angular-animate/angular-animate.min.js',
            SRC + 'components/angular-route/angular-route.min.js',
            SRC + 'components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            SRC + 'components/angular-bootstrap/ui-bootstrap-csp.css',
            SRC + 'components/bootstrap/dist/css/bootstrap.min.css'
        ])
        .pipe(changed(DIST + 'components'))
        .pipe(gulp.dest(DIST + 'components'));
});
gulp.task('bower', function() {
    return bower({
        cmd: 'install'
    });
})


var lr;
function reloadCB(event) {
    var fileName = require('path').relative(__dirname + '/dist/', event.path);

    lr.changed({
        body: {
            files: [fileName]
        }
    });
}


gulp.task('buildWatcher', function() {
    return gulp.watch([SRC + '**/*.*', SRC + '*.*'], ['devBuild']);
})


gulp.task('reloadWatcher', function() {
    return gulp.watch([DIST + '**/*.*', DIST + '*.*'], reloadCB);
})


gulp.task('devServer', function() {
    var appServ = express();
    lr = require('tiny-lr')();
    lr.listen(LIVERELOAD_PORT);
    var root = __dirname + '\\dist';
    util.log(root);
    appServ.use('/dist', express.static(root));
    appServ.use(require('connect-livereload')());
    appServ.listen(PORT);
})


gulp.task('devEnv', function() {
    return sequence('devServer', 'devBuild', ['buildWatcher', 'reloadWatcher']);
})