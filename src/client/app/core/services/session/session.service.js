(function() {
  'use strict';

  angular
    .module('core.session')
    .factory('session', session);

  /* @ngInject */
  function session($resource, $q) {
    var Auth = $resource('/api/auth/session');

    return {
      signin: signin
    };

    /////////////

    function signin(user) {
      var defer = $q.defer();

      Auth.save({
        email: user.email,
        password: user.password,
        rememberMe: user.rememberMe
      }, function(user) {
        defer.resolve(user);
      }, function(err) {
        defer.reject(err.data);
      });

      return defer.promise;
    }
  }

})();
