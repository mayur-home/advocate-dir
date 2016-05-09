(function() {
  'use strict';

  angular
    .module('app')
    .run(run);

  /* @ngInject */
  function run(session) {
    console.log('Run logged');
  }
})();
