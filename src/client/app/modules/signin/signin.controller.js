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
      logger.info('Activated Sign In View');
    }

    function login() {
      session.login({
        email: vm.model.email,
        password: vm.model.password
      })
        .then(loginSuccess)
        .catch(loginFailure);

      function loginSuccess(user) {
        logger.info('User has logged in successfully');
      }

      function loginFailure() {
        logger.info('Login failed');
      }
    }
  }
})();
