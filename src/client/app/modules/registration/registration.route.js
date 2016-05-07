(function() {
  'use strict';

  angular
    .module('app.registration')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'registration',
        config: {
          url: '/partials/registration',
          templateUrl: 'app/modules/registration/registration.html',
          controller: 'RegistrationController',
          controllerAs: 'vm',
          title: 'registration'
        }
      }
    ];
  }
})();
