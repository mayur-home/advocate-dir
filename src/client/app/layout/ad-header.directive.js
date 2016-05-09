(function() {
  'use strict';

  angular
    .module('app.layout')
    .directive('adHeader', adHeader);

  /* @ngInject */
  function adHeader() {
    var directive = {
      bindToController: true,
      controller: TopNavController,
      controllerAs: 'vm',
      restrict: 'EA',
      scope: {
        'navline': '='
      },
      templateUrl: 'app/layout/ad-header.html'
    };

    TopNavController.$inject = ['$scope'];

    /* @ngInject */
    function TopNavController($scope) {
      var vm = this;
      $scope.isCollapsed = true;
    }

    return directive;
  }
})();
