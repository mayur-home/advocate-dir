/*jshint node:true*/
//jshint -W089
'use strict';

var express = require('express');
var session = require('express-session');
var app = express();
var router = express.Router();
var routes = require('./routes');
var passport = require('passport');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 8001;
var four0four = require('./utils/404')();
var mongoose = require('mongoose');
var flash = require('connect-flash');
var path = require('path');
var auth = require('./app/config/authentication');

var dbHost = 'mongodb://localhost:27017/test';
mongoose.connect(dbHost);

var environment = process.env.NODE_ENV;

app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret:'mtSecretKey' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(logger('dev'));
app.use('/api', routes);

// handling Angular routes
// TODO: cleanup
var securedPages = [
  '/partials'
];
// All secured pages needs to be pass authentication
for (var index in securedPages) {
  router.get(securedPages[index], auth.ensureAuthenticated);
}

app.use(router);

require('./app/config/passport');

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

switch (environment) {
  case 'build':
    console.log('** BUILD **');
    app.use(express.static('./build/'));
    // Any invalid calls for templateUrls are under app/* and should return 404
    app.use('/app/*', function(req, res, next) {
      four0four.send404(req, res);
    });
    // Any deep link calls should return index.html
    app.use('/*', express.static('./build/index.html'));
    break;
  default:
    console.log('** DEV **');
    app.use(express.static('./src/client/'));
    app.use(express.static('./'));
    app.use(express.static('./tmp'));
    // Any invalid calls for templateUrls are under app/* and should return 404
    app.use('/app/*', function(req, res, next) {
      four0four.send404(req, res);
    });
    // Any deep link calls should return index.html
    app.use('/*', express.static('./src/client/index.html'));
    break;
}

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + app.get('env') +
    '\n__dirname = ' + __dirname +
    '\nprocess.cwd = ' + process.cwd());
});
