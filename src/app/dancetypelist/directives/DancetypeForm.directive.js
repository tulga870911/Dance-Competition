(function() {
  'use strict';

  angular
    .module('app.dancetypelist')
    .directive('gzDancetypeForm', gzDancetypeForm);

  function gzDancetypeForm() {
    return {
      templateUrl: 'app/dancetypelist/directives/DancetypeForm.html',
      restrict: 'E',
      controller: DancetypeFormController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        dancetypes: '='
      }
    }
  }

  DancetypeFormController.$inject = ['DancetypeService'];

  function DancetypeFormController(DancetypeService) {

    var vm = this;

    vm.addDancetype = addDancetype;
    vm.newDancetype = new DancetypeService.Dancetype();

    function addDancetype() {

      var date = vm.newDancetype.date;
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = 1900 + date.getYear();
      vm.newDancetype.date = year + '-' + month + '-' + day;
      vm.dancetypes.$add(vm.newDancetype);
      vm.newDancetype = new DancetypeService.Dancetype();
    }
  }

})();
