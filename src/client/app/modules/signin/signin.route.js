(function() {
  'use strict';

  angular
    .module('app.signin')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'signin',
        config: {
          url: '/partials/signin',
          templateUrl: 'app/modules/signin/signin.html',
          controller: 'SigninController',
          controllerAs: 'vm',
          title: 'login'
        }
      }
    ];
  }
})();
