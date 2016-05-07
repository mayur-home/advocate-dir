'use strict';

var person = require('../../app/controllers/person');

module.exports = function(router) {
  router.get('/person', person.getAll);
};
