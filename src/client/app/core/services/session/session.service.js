(function() {
  'use strict';

  angular
    .module('core.session')
    .factory('session', session);

  /* @ngInject */
  function session($http, $q, $rootScope, $window) {
    var authUrl = '/api/auth/session';

    return {
      signin: signin,
      signout: signout,
      getLoginData: getLoginData,
      set: set,
      get: get,
      remove: remove
    };

    /////////////

    function signin(user) {
      var defer = $q.defer();

      $http.post(authUrl, {
        email: user.email,
        password: user.password,
        rememberMe: user.rememberMe
      }).then(signinSuccess, signinFailure);

      function signinSuccess(response) {
        var user = response.data;
        set('user', user.email);
        $rootScope.$broadcast('login', user);
        defer.resolve(user);
      }

      function signinFailure(err) {
        defer.reject(err.data);
      }

      return defer.promise;
    }

    function signout() {
      $http.delete(authUrl)
        .then(function() {
          console.log('session deleted');
          remove('user');
        });
    }

    function getLoginData() {
      var defer = $q.defer();

      $http.get(authUrl)
        .then(getSessionSuccess);

      function getSessionSuccess(response) {
        if (response.data._id) {
          var user = response.data;
          set('user', user.email);
          defer.resolve(user);
        }
      }

      return defer.promise;
    }

    function set(key, value) {
      $window.sessionStorage.setItem(key, value);
    }

    function get(key) {
      return $window.sessionStorage.getItem(key);
    }

    function remove(key) {
      $window.sessionStorage.removeItem(key);
    }
  }

})();
