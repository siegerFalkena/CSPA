var gulp = require('gulp'),
    watch = require('gulp-watch'),
    util = require('gulp-util'),
    changed = require('gulp-changed'),
    sequence = require('run-sequence'),
    injectReload = require('gulp-inject-reload'),
    bower = require('gulp-bower'),
    express = require('express'),
    cookieParser = require('cookie-parser'),
    Server = require('karma').Server;

var SRC = './app/',
    src = SRC.substring(2, 100),
    DIST = './dist/',
    dist = DIST.substring(2, 100),
    PORT = 4000,
    LIVERELOAD_PORT = 35729;
//build, components

var excludeBowerImports = ['!' + src + 'assets/bower/*.*',
    '!' + src + 'assets/bower/**/*.*'
];

gulp.task('build', ['components'], function() {
    util.log(excludeBowerImports);
    gulp.src([SRC + '**/*.*', excludeBowerImports[0],
            excludeBowerImports[1]
        ])
        .pipe(changed(DIST))
        .pipe(gulp.dest(DIST));
    return gulp.src([SRC + '*.*', '!' + SRC +
            'assets/*.*', '!**/*.css'
        ])
        .pipe(changed(DIST))
        .pipe(gulp.dest(DIST));
})


gulp.task('devBuild', ['components', 'test'], function() {
    gulp.src([SRC + '**/*.*', excludeBowerImports[0],
            excludeBowerImports[1]
        ])
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


gulp.task('copycomponents', ['copyCSS', 'copyImages'],
    function() {
        return gulp.src([
                SRC +
                'assets/bower/angular/angular.min.js',
                SRC +
                'assets/bower/angular-localization/angular-localization.js',
                SRC +
                'assets/bower/angular-sanitize/angular-sanitize.min.js',
                SRC +
                'assets/bower/underscore/underscore-min.js',
                SRC +
                'assets/bower/angular-ui-grid/ui-grid.min.js',
                SRC +
                'assets/bower/angular-toArrayFilter/toArrayFilter.js',
                SRC +
                'assets/bower/angular-animate/angular-animate.min.js',
                SRC +
                'assets/bower/angular-resource/angular-resource.min.js',
                SRC +
                'assets/bower/angular-cookies/angular-cookies.min.js',
                SRC +
                'assets/bower/angular-route/angular-route.min.js',
                SRC +
                'assets/bower/angular-mocks/angular-mocks.js',
                SRC +
                'assets/bower/angular-ui-router/release/angular-ui-router.min.js',
                SRC +
                'assets/bower/angular-bootstrap/ui-bootstrap-tpls.min.js',
                SRC +
                'assets/bower/oclazyload/dist/ocLazyLoad.min.js'
            ])
            .pipe(changed(DIST + 'assets/js/'))
            .pipe(gulp.dest(DIST + 'assets/js/'));
    });
gulp.task('copyCSS', ['copyFonts'], function() {
    return gulp.src([
            SRC +
            'metro-bootstrap.css',
            SRC +
            'ui-grid.css',
            SRC +
            'assets/bower/angular-ui-grid/ui-grid.woff',
            SRC +
            'assets/bower/angular-ui-grid/ui-grid.ttf',
            SRC +
            'assets/bower/angular-ui-grid/ui-grid.min.css',
            SRC +
            'assets/bower/angular-ui-grid/ui-grid.svg',
            SRC +
            'assets/bower/angular-ui-grid/ui-grid.eot',
            SRC + 'stylesheet.css'
        ])
        .pipe(changed(DIST + 'assets/css/'))
        .pipe(gulp.dest(DIST + 'assets/css/'));
});

gulp.task('copyFonts', function() {
    return gulp.src([
            SRC +
            'assets/fonts/glyphicons-halflings-regular.woff2',
        ])
        .pipe(changed(DIST + 'assets/fonts/'))
        .pipe(gulp.dest(DIST + 'assets/fonts/'));
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
    var fileName = require('path').relative(__dirname +
        '/dist/', event.path);

    lr.changed({
        body: {
            files: [fileName]
        }
    });
}

gulp.task('test', function() {
    gulp.src(
        'assets/bower/angular-mocks/angular-mocks.js'
    ).pipe(gulp.dest('assets/js/'));
    return sequence('devBuild', 'runTestServer');
})

gulp.task('runTestServer', function(done) {
    new Server({
        configFile: __dirname +
            '/karma.conf.js',
        singleRun: true
    }, function() {
        done();
    }).start();
})

gulp.task('buildWatcher', function() {
    util.log('watching ' + SRC + ' for build');
    return gulp.watch([SRC + '**/*.*', SRC + '*.*', '!' + SRC +
        '/assets/bower/**/*.*', excludeBowerImports[1]
    ], [
        'devBuild'
    ]);
})


gulp.task('reloadWatcher', function() {
    util.log('watching ' + DIST + 'for builds');
    return gulp.watch([DIST + '**/*.*', DIST +
        '*.*'
    ], reloadCB);
})

var appServ;
gulp.task('devServer', function() {
    appServ = express();
    var REST = express.Router();
    expressRESTservice(REST);
    var auth = express.Router();
    expressAuthService(auth);

    lr = require('tiny-lr')();
    lr.listen(LIVERELOAD_PORT);
    var root = __dirname + '\\dist';
    util.log(root);
    appServ.use(cookieParser());
    appServ.use('/auth', auth);
    appServ.use('/REST', REST);
    appServ.use('/LANG', express.static(root + '\\language'));
    appServ.use('/', express.static(root));
    appServ.use(require('connect-livereload')());
    appServ.listen(PORT);
});


gulp.task('devEnv', function() {
    return sequence('devServer', 'devBuild', [
        'buildWatcher', 'reloadWatcher'
    ]);
});

function XorHash(string) {
    var bytes = '';
    var randomSeed = "abcdefghijklmnopqrsetuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < string.length; ++i) {
        var temp = string.charCodeAt(i) ^ randomSeed.charCodeAt(i);
        bytes += String.fromCharCode(33 + temp);
    }
    return bytes;
}

function expressAuthService(router) {
    router.post('/reauth', function(req, res, cb) {
        var authKey = req.cookies.authToken;
        var user = req.cookies.user;
        if (authKey == undefined || user == undefined) {
            res.sendStatus(403);
        } else {
            res.cookie("authToken", XorHash(authorization));
            res.cookie("role", "admin");
            res.sendStatus(200);
        }
        cb();
    });

    router.post('/auth', function(req, res, cb) {
        var user = req.header('user');
        var passwd = req.header('password');
        //accepted
        if(user == undefined || passwd == undefined){
            res.sendStatus(403);
        } else{
            res.cookie("user", user);
            res.cookie("authToken", XorHash(user + '\|' + passwd));
            res.cookie("role", "admin");
            res.sendStatus(200);
        } 
        cb();
    });
};

function expressRESTservice(router) {
    router.get('/product/:id', function(req, res, cb) {
        if (req.cookies.authToken == undefined) {
            res.sendStatus(403);
        }
        res.json({
            ID: 4,
            name: 'granaatappel',
            price: '6.99'
        });
        cb();
    });
    router.get('/product', function(req, res, cb) {
        res.jsonp([{
            ID: 1,
            name: 'appel',
            price: '9.99'
        }, {
            ID: 2,
            name: 'peer',
            price: '8.99'
        }, {
            ID: 3,
            name: 'banaan',
            price: '7.99'
        }, {
            ID: 4,
            name: 'granaatappel',
            price: '6.99'
        }, {
            ID: 5,
            name: 'kiwi',
            price: '6.99'
        }, {
            ID: 6,
            name: 'papaya',
            price: '6.99'
        }, {
            ID: 8,
            name: 'lemon',
            price: '6.99'
        }, {
            ID: 9,
            name: 'melon',
            price: '6.99'
        }, {
            ID: 10,
            name: 'blueberry',
            price: '6.99'
        }, {
            ID: 11,
            name: 'dragonfruit',
            price: '6.99'
        }, {
            ID: 12,
            name: 'coconut',
            price: '6.99'
        }, {
            ID: 13,
            name: 'lime',
            price: '6.99'
        }, {
            ID: 14,
            name: 'peach',
            price: '6.99'
        }, {
            ID: 15,
            name: 'tomato',
            price: '6.99'
        }]);
        cb();
    });


}
