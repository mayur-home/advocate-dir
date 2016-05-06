(function() {
  'use strict';

  angular
    .module('core.profile')
    .factory('profile', profile);

  /* @ngInject */
  function profile($resource, $q) {
    var Profile = $resource('/api/user/:id', {id:'@id'});

    return {
      create: create
    };

    /////////////

    function create(user) {
      var defer = $q.defer();

      Profile.save(user, function(user) {
        defer.resolve(user);
      }, function(err) {
        defer.reject(err.data);
      });

      return defer.promise;
    }
  }

})();
