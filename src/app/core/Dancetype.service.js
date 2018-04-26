(function(){
  'use strict';

  angular
    .module('app.core')
    .factory('DancetypeService', DancetypeService);

  DancetypeService.$inject = ['$firebaseArray', 'firebaseDataService'];

  function DancetypeService($firebaseArray, firebaseDataService) {

    var service = {
      getDancetypes: getDancetypes,
      Dancetype: Dancetype
    };

    return service;

    ////////////

    function getDancetypes() {
      return $firebaseArray(firebaseDataService.dancetypes);
    }

    function Dancetype() {
      this.name = '';
      this.description = '';
      this.date = new Date();
    }
  }

})();