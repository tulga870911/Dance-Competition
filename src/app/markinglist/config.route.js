(function() {
  'use strict';

  angular
    .module('app.markinglist')
    .config(configFunction);

  configFunction.$inject = ['$routeProvider'];

  function configFunction($routeProvider) {
    $routeProvider.when('/markinglist', {
      templateUrl: 'app/markinglist/markinglist.html',
      controller: 'markingListController',
      controllerAs: 'vm',
      resolve: {user: resolveUser}
    });

    $routeProvider.when('/addMarkingInfo', {
      templateUrl: 'app/markinglist/directives/markDance.html',
      controller: 'markingListController',
      controllerAs: 'vm',
      resolve: {user: resolveUser}
    });
  }

  resolveUser.$inject = ['authService'];

  function resolveUser(authService) {
    return authService.firebaseAuthObject.$requireAuth();
  }

})();
