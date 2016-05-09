(function() {
  'use strict';

  angular
    .module('app.signin')
    .controller('SigninController', SigninController);

  /* @ngInject */
  function SigninController(session, logger, $state) {
    var vm = this;
    vm.title = 'Signin';
    vm.signin = signin;

    activate();

    //////////////

    function activate() {
      logger.info('Activated Sign In View');
    }

    function signin() {
      session.signin({
        email: vm.model.email,
        password: vm.model.password
      })
        .then(loginSuccess)
        .catch(loginFailure);

      function loginSuccess(user) {
        logger.info('User has logged in successfully');
        $state.go('welcome');
      }

      function loginFailure() {
        logger.info('Login failed');
      }
    }
  }
})();
