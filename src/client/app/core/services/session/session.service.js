(function() {
  'use strict';

  angular
    .module('core.session')
    .factory('session', session);

  /* @ngInject */
  function session($http, $q, $rootScope) {
    var authUrl = '/api/auth/session';
    var user = {};

    return {
      signin: signin,
      signout: signout,
      get: getSession,
      getUser: getUser
    };

    /////////////

    function signin(user) {
      var defer = $q.defer();

      $http.post(authUrl, {
        email: user.email,
        password: user.password,
        rememberMe: user.rememberMe
      }).then(function(response) {
        user = response.data;
        $rootScope.$broadcast('login', user);
        defer.resolve(user);
      }, function(err) {
        defer.reject(err.data);
      });

      return defer.promise;
    }

    function signout() {
      $http.delete(authUrl)
        .then(function(data) {
          console.log('session deleted');
          user = {};
        });
    }

    function getSession() {
      var defer = $q.defer();

      $http.get(authUrl)
        .then(function(response) {
          if (response.data._id) {
            user = response.data;
            defer.resolve(user);
          }
        });

      return defer.promise;
    }

    function getUser() {
      return user;
    }
  }

})();
