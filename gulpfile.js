'use strict';

var gulp = require('gulp');
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );

/** Configuration **/
var user = process.env.FTP_USER;
var password = process.env.FTP_PWD;
var host = 'jamiakarimia-khalpar.netne.net';
var port = 21;
var libs = [
    'libs/bootstrap/dist/css/bootstrap.min.css',
    'libs/ladda/dist/ladda-themeless.min.css',
    'libs/angular-material/angular-material.min.css',
    'libs/angular-material-data-table/dist/md-data-table.min.css',
    'libs/angular-flash-alert/dist/angular-flash.min.css',
    'libs/jquery/dist/jquery.min.js',
    'libs/bootstrap/dist/js/bootstrap.min.js',
    'libs/angular/angular.min.js',
    'libs/angular-auto-validate/dist/jcs-auto-validate.min.js',
    'libs/ladda/dist/spin.min.js',
    'libs/ladda/dist/ladda.min.js',
    'libs/angular-ladda/dist/angular-ladda.min.js',
    'libs/angular-ui-router/release/angular-ui-router.min.js',
    'libs/angular-translate/angular-translate.min.js',
    'libs/angular-animate/angular-animate.min.js',
    'libs/angular-aria/angular-aria.min.js',
    'libs/angular-material/angular-material.min.js',
    'libs/angular-messages/angular-messages.min.js',
    'libs/angular-resource/angular-resource.min.js',
    'libs/angular-material-data-table/dist/md-data-table.min.js',
    'libs/angular-flash-alert/dist/angular-flash.min.js'
];
var localFilesGlob = [
    'libs/**/*',
    'assets/**/*',
    'controllers/**',
    'model/**',
    'views/**',
    'index.php'
];
var remoteFolder = '/public_html';

// helper function to build an FTP connection based on our configuration
function getFtpConnection() {
    return ftp.create({
        host: host,
        port: port,
        user: user,
        password: password,
        parallel: 5,
        log: gutil.log
    });
}

/**
 * Deploy task.
 * Copies the new files to the server
 *
 * Usage: `FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy`
 */
gulp.task('ftp-deploy', function() {

    var conn = getFtpConnection();

    return gulp.src(localFilesGlob, { base: '.', buffer: false })
        .pipe( conn.newer( remoteFolder ) ) // only upload newer files
        .pipe( conn.dest( remoteFolder ) )
        ;
});

/**
 * Watch deploy task.
 * Watches the local copy for changes and copies the new files to the server whenever an update is detected
 *
 * Usage: `FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy-watch`
 */
gulp.task('ftp-deploy-watch', function() {

    var conn = getFtpConnection();

    gulp.watch(localFilesGlob)
        .on('change', function(event) {
            console.log('Changes detected! Uploading file "' + event.path + '", ' + event.type);

            return gulp.src( [event.path], { base: '.', buffer: false } )
                .pipe( conn.newer( remoteFolder ) ) // only upload newer files
                .pipe( conn.dest( remoteFolder ) )
                ;
        });
});