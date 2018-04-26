(function() {
  'use strict';

  angular
    .module('app.markinglist')
    .controller('markingListController', markingListController);

  markingListController.$inject = ['$rootScope', 'DanceService', 'user', '$scope', '$location', '$timeout'];

  function markingListController($rootScope, DanceService, user, $scope, $location, $timeout) {

    var vm = this;

    $scope.isActive = function(route) {
      $scope.path = $location.path();
      return $location.path() === route;
    };

    vm.dancies = DanceService.getDancies();

    $rootScope.$on('logout', function() {
      vm.dancies.$destroy();
    });

  }

})();
