(function() {
  'use strict';

  angular
    .module('app.waitlist')
    .controller('WaitListController', WaitListController);

  WaitListController.$inject = ['$rootScope', 'partyService', 'user'];

  function WaitListController($rootScope, partyService, user) {
    var vm = this;

    vm.parties = partyService.getPartiesByUser(user.uid);

    $rootScope.$on('logout', function() {
      vm.parties.$destroy();
    });
  }

})();
