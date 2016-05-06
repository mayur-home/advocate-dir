'use strict';

var auth = require('../../app/config/authentication'),
  session = require('../../app/controllers/session');

module.exports = function(router) {
  router.get('/auth/session', auth.ensureAuthenticated, session.session);
  router.post('/auth/session', session.login);
  // router.del('/auth/session', session.logout);
};
