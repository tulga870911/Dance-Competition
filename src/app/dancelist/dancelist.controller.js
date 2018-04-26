(function() {
  'use strict';

  angular
    .module('app.dancelist')
    .controller('danceListController', danceListController);

  danceListController.$inject = ['$rootScope', 'DanceService', 'user', '$scope', '$location', '$timeout', '$sessionStorage'];

  function danceListController($rootScope, DanceService, user, $scope, $location, $timeout, $sessionStorage) {

    var vm = this;
    vm.press_addbtn = press_addbtn;

    $scope.isActive = function(route) {
      $scope.path = $location.path();
      return $location.path() === route;
    };

    vm.dancies = DanceService.getDancies();

    $rootScope.$on('logout', function() {
      vm.dancies.$destroy();
    });

    function press_addbtn() {
      $sessionStorage.add_dance = true;
    }
  }

})();
