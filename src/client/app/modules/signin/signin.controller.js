(function() {
  'use strict';

  angular
    .module('app.signin')
    .controller('SigninController', SigninController);

  SigninController.$inject = ['session', 'logger'];
  /* @ngInject */
  function SigninController(session, logger) {
    var vm = this;
    vm.title = 'Signin';
    vm.login = login;

    activate();

    //////////////

    function activate() {
      logger.info('Activated Dashboard View');
    }

    function login() {
      session.login({
        email: vm.email,
        password: vm.password
      })
        .then(loginSuccess)
        .catch(loginFailure);

      function loginSuccess(user) {
        logger.info('user has logged in successfully');
      }

      function loginFailure() {
        logger.info('login failed');
      }
    }
  }
})();
