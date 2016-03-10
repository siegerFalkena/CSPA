var gulp = require('gulp'),
    watch = require('gulp-watch'),
    util = require('gulp-util'),
    changed = require('gulp-changed'),
    sequence = require('run-sequence'),
    injectReload = require('gulp-inject-reload'),
    bower = require('gulp-bower'),
    express = require('express'),
    Server = require('karma').Server;

var SRC = './app/',
    src = SRC.substring(2, 100),
    DIST = './dist/',
    dist = DIST.substring(2, 100),
    PORT = 4000,
    LIVERELOAD_PORT = 35729;
//build, components

var excludeBowerImports = ['!' + src + 'assets/bower/*.*', '!' + src + 'assets/bower/**/*.*'];

gulp.task('build', ['components'], function() {
    util.log(excludeBowerImports);
    gulp.src([SRC + '**/*.*', excludeBowerImports[0], excludeBowerImports[1]])
        .pipe(changed(DIST))
        .pipe(gulp.dest(DIST));
    return gulp.src([SRC + '*.*', '!' + SRC + 'assets/*.*', '!**/*.css'])
        .pipe(changed(DIST))
        .pipe(gulp.dest(DIST));
})


gulp.task('devBuild', ['components', 'test'], function() {
    gulp.src([SRC + '**/*.*', excludeBowerImports[0], excludeBowerImports[1]])
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


gulp.task('copycomponents',['copyCSS', 'copyImages'], function() {
    return gulp.src([
            SRC + 'assets/bower/angular/angular.min.js',
            SRC + 'assets/bower/angular-animate/angular-animate.min.js',
            SRC + 'assets/bower/angular-cookies/angular-cookies.min.js',
            SRC + 'assets/bower/angular-route/angular-route.min.js',
            SRC + 'assets/bower/angular-mocks/angular-mocks.js',
            SRC + 'assets/bower/angular-ui-router/release/angular-ui-router.min.js',
            SRC + 'assets/bower/angular-bootstrap/ui-bootstrap-tpls.min.js'
        ])
        .pipe(changed(DIST + 'assets/js/'))
        .pipe(gulp.dest(DIST + 'assets/js/'));
});
gulp.task('copyCSS', function() {
    return gulp.src([
            SRC + 'assets/bower/angular-bootstrap/ui-bootstrap-csp.css',
            SRC + 'assets/bower/bootstrap/dist/css/bootstrap.min.css',
            SRC + 'stylesheet.css'
        ])
        .pipe(changed(DIST + 'assets/css/'))
        .pipe(gulp.dest(DIST + 'assets/css/'));
});

gulp.task('copyImages', function() {
    return gulp.src([
            SRC + 'assets/images/*.*',
        ])
        .pipe(changed(DIST + 'assets/images/'))
        .pipe(gulp.dest(DIST + 'assets/images/'));
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

gulp.task('test', function() {
    gulp.src('assets/bower/angular-mocks/angular-mocks.js').pipe(gulp.dest('assets/js/'));
    return sequence('devBuild', 'runTestServer');
})

gulp.task('runTestServer', function(done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function(){
        done();    
    }).start();
})

gulp.task('buildWatcher', function() {
    util.log('watching '+ SRC+' for build');
    return gulp.watch([SRC + '**/*.*', SRC + '*.*'], ['devBuild']);
})


gulp.task('reloadWatcher', function() {
    util.log('watching '+ DIST +'for builds');
    return gulp.watch([DIST + '**/*.*', DIST + '*.*'], reloadCB);
})


gulp.task('devServer', function() {
    var appServ = express();
    lr = require('tiny-lr')();
    lr.listen(LIVERELOAD_PORT);
    var root = __dirname + '\\dist';
    util.log(root);
    appServ.use('/', express.static(root));
    appServ.use(require('connect-livereload')());
    appServ.listen(PORT);
})


gulp.task('devEnv', function() {
    return sequence('devServer', 'devBuild', ['buildWatcher', 'reloadWatcher']);
})

