(function() {
  'use strict';

  angular
    .module('app.judgelist')
    .config(configFunction);

  configFunction.$inject = ['$routeProvider'];

  function configFunction($routeProvider) {
    $routeProvider.when('/judgelist', {
      templateUrl: 'app/judgelist/judgelist.html',
      controller: 'judgelistController',
      controllerAs: 'vm',
      resolve: {user: resolveUser}
    });
  }

  resolveUser.$inject = ['authService'];

  function resolveUser(authService) {
    return authService.firebaseAuthObject.$requireAuth();
  }

})();
