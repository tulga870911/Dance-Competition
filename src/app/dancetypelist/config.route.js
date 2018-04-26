(function() {
  'use strict';

  angular
    .module('app.dancetypelist')
    .config(configFunction);

  configFunction.$inject = ['$routeProvider'];

  function configFunction($routeProvider) {
    $routeProvider.when('/dancetypelist', {
      templateUrl: 'app/dancetypelist/dancetypelist.html',
      controller: 'dancetypeListController',
      controllerAs: 'vm',
      resolve: {user: resolveUser}
    });
  }

  resolveUser.$inject = ['authService'];

  function resolveUser(authService) {
    return authService.firebaseAuthObject.$requireAuth();
  }

})();
