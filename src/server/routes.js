'use strict';

var router = require('express').Router();

var routes = [
  './app/routers/auth',
  './app/routers/person',
  './app/routers/user'
];

for(var item in routes) {
  require(routes[item])(router);
}

module.exports = router;
