(function() {
  'use strict';

  angular
    .module('app.markinglist')
    .directive('gzMarkingTable', gzMarkingTable);

  function gzMarkingTable() {
    return {
      templateUrl: 'app/markinglist/directives/MarkingTable.html',
      restrict: 'E',
      controller: MarkingTableController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        dancies: '='
      }
    }
  }

  MarkingTableController.$inject = ['DanceService','$location','$sessionStorage'];

  function MarkingTableController(DanceService, $location, $sessionStorage) {

    var vm = this;

    vm.marking = marking;

    function marking(Dance) {
      
      var returnData = [];
      for(var i = 0;i < Dance.dancetype.length;i ++){
          if(i == 0){
            returnData[i] = false;
          }else{
            returnData[i] = true;
          }
          
        }
        $sessionStorage.panel_flag = returnData;
        $sessionStorage.SessionMessage = Dance;

        $location.path('/addMarkingInfo');
      }

  }

})();