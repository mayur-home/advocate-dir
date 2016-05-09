(function() {
  'use strict';

  angular
    .module('app')
    .run(run);

  /* @ngInject */
  function run(logger) {
    logger.info('Run logged');
  }
})();
