'use strict';

var user = require('../../app/controllers/user');

module.exports = function(router) {
  router.post('/user', user.create);
};
