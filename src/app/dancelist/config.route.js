(function() {
  'use strict';

  angular
    .module('app.dancelist')
    .config(configFunction);

  configFunction.$inject = ['$routeProvider'];

  function configFunction($routeProvider) {
    $routeProvider.when('/dancelist', {
      templateUrl: 'app/dancelist/dancelist.html',
      controller: 'danceListController',
      controllerAs: 'vm',
      resolve: {user: resolveUser}
    });

    $routeProvider.when('/addDanceInfo', {
      templateUrl: 'app/dancelist/directives/addDance.html',
      controller: 'danceListController',
      controllerAs: 'vm',
      resolve: {user: resolveUser}
    });

    $routeProvider.when('/showResult', {
      templateUrl: 'app/dancelist/directives/showResult.html',
      controller: 'danceListController',
      controllerAs: 'vm',
      resolve: {user: resolveUser}
    });
  }

  resolveUser.$inject = ['authService'];

  function resolveUser(authService) {
    return authService.firebaseAuthObject.$requireAuth();
  }

})();
