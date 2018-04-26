(function() {
  'use strict';

  angular
    .module('app.judgelist')
    .directive('gzJudgeTable', gzJudgeTable);

  function gzJudgeTable() {
    return {
      templateUrl: 'app/judgelist/directives/JudgeTable.html',
      restrict: 'E',
      controller: JudgeTableController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        judges: '='
      }
    }
  }

  JudgeTableController.$inject = [];

  function JudgeTableController() {
    
    var vm = this;

    vm.removeJudge = removeJudge;
    vm.toggleDone = toggleDone;

    function removeJudge(Judge) {
      vm.judges.$remove(Judge);
    }

    function toggleDone(Judge) {
      vm.judges.$save(Judge);
    }

  }

})();
