(function() {
  'use strict';

  angular
    .module('app.registration')
    .controller('RegistrationController', RegistrationController);

  RegistrationController.$inject = ['profile', 'logger'];
  /* @ngInject */
  function RegistrationController(profile, logger) {
    var vm = this;
    vm.title = 'Registration';
    vm.signup = signup;

    activate();

    //////////////

    function activate() {
      logger.info('Activated Signup View');
    }

    function signup() {
      profile.create(vm.model)
        .then(registrationSuccess)
        .catch(registrationFailure);

      function registrationSuccess(user) {
        logger.info('user registered successfully');
      }

      function registrationFailure() {
        logger.info('registration failed');
      }
    }
  }
})();
