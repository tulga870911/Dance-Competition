(function() {
  'use strict';

  angular
    .module('app.layout')
    .directive('gzNavbar', function() {
      return {
        templateUrl: 'app/layout/navbar.html',
        restrict: 'E',
        scope: {},
        controller: NavBarController,
        controllerAs: 'vm'
      }
    });

  NavBarController.$inject = ['$location', 'authService'];

  function NavBarController($location, authService) {
    var vm = this;

    vm.isLoggedIn = authService.isLoggedIn;
    vm.login = authService.login;
    vm.logout = logout;

    function logout() {
      authService.logout();
      $location.path('/');
    }
  }
})();