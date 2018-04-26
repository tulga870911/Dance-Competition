(function() {
  'use strict';

  angular
    .module('app.judgelist')
    .controller('judgelistController', judgelistController);

  judgelistController.$inject = ['$rootScope', 'JudgeService', 'user', '$scope', '$location'];

  function judgelistController($rootScope, JudgeService, user, $scope, $location) {

    var vm = this;
    
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

    vm.judges = JudgeService.getJudges();

    $rootScope.$on('logout', function() {
      vm.judges.$destroy();
    });
  }

})();
