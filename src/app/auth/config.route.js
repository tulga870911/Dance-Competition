(function() {
  'use strict';

  angular
    .module('app.auth')
    .config(configFunction);

  configFunction.$inject = ['$routeProvider'];

  function configFunction($routeProvider) {
    $routeProvider.when('/register', {
      templateUrl: 'app/auth/register.html',
      controller: 'AuthController',
      controllerAs: 'vm'
    });
/*-------Login as judge---------*/ 
    $routeProvider.when('/login', {
      templateUrl: 'app/auth/login.html',
      controller: 'AuthController',
      controllerAs: 'vm',
    });
  }

})();