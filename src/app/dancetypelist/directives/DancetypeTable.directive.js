(function() {
  'use strict';

  angular
    .module('app.dancetypelist')
    .directive('gzDancetypeTable', gzDancetypeTable);

  function gzDancetypeTable() {
    return {
      templateUrl: 'app/dancetypelist/directives/DancetypeTable.html',
      restrict: 'E',
      controller: DancetypeTableController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        dancetypes: '='
      }
    }
  }

  DancetypeTableController.$inject = ['DancetypeService'];

  function DancetypeTableController(DancetypeService) {

    var vm = this;

    vm.removeDancetype = removeDancetype;
    vm.toggleDone = toggleDone;

    function removeDancetype(Dancetype) {
      vm.dancetypes.$remove(Dancetype);
    }

    function toggleDone(Dancetype) {
      vm.dancetypes.$save(Dancetype);
    }

  }

})();