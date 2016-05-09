(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('ShellController', ShellController);

  ShellController.$inject = ['config', 'logger', '$rootScope', 'session'];
  /* @ngInject */
  function ShellController(config, logger, $rootScope, session) {
    var vm = this;
    vm.navline = {
      title: config.appTitle
    };
    $rootScope.$on('login', loggedIn);
    $rootScope.$on('logOut', loggedOut);

    activate();

    /////////////////

    function activate() {
      logger.success(config.appTitle + ' loaded!', null);
      session.getLoginData().then(function(user) {
        vm.username = user.email;
      });
    }

    function loggedIn(event, user) {
      vm.username = user.email;
    }

    function loggedOut() {
      vm.username = null;
    }
  }
})();
