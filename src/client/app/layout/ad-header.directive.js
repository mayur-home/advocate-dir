(function() {
  'use strict';

  angular
    .module('app.layout')
    .directive('adHeader', adHeader);

  /* @ngInject */
  function adHeader(session, $rootScope, $state) {
    var directive = {
      bindToController: true,
      controller: TopNavController,
      controllerAs: 'vm',
      restrict: 'EA',
      scope: {
        'navline': '=navline',
        'user': '=user'
      },
      templateUrl: 'app/layout/ad-header.html'
    };

    TopNavController.$inject = ['$scope'];

    /* @ngInject */
    function TopNavController($scope) {
      var vm = this;
      vm.logout = logout;
      $scope.isCollapsed = true;

      /////////////

      function logout() {
        session.signout();
        $rootScope.$broadcast('logOut');
        $state.go('signin');
      }
    }

    return directive;
  }
})();
