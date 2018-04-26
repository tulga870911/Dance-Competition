(function() {
  'use strict';

  angular
    .module('app.dancetypelist')
    .controller('dancetypeListController', dancetypeListController);

  dancetypeListController.$inject = ['$rootScope', 'DancetypeService', 'user', '$scope', '$location'];

  function dancetypeListController($rootScope, DancetypeService, user, $scope, $location) {

    var vm = this;

    $scope.isActive = function(route) {
      $scope.path = $location.path();
      return $location.path() === route;
    };

    vm.dancetypes = DancetypeService.getDancetypes();

    $rootScope.$on('logout', function() {
      vm.dancetypes.$destroy();
    });

  }

})();
