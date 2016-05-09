(function() {
  'use strict';

  angular
    .module('app.welcome')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'welcome',
        config: {
          url: '/partials/welcome',
          templateUrl: 'app/modules/welcome/welcome.html',
          controller: 'WelcomeController',
          controllerAs: 'vm',
          title: 'Welcome'
        }
      }
    ];
  }
})();
