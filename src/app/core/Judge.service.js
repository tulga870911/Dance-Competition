(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('JudgeService', JudgeService);

  JudgeService.$inject = ['$firebaseArray', 'firebaseDataService'];

  function JudgeService($firebaseArray, firebaseDataService) {

    var service = {
      getJudges: getJudges,
      Judge: Judge
    };

    return service;

    ////////////

    function getJudges() {
      return $firebaseArray(firebaseDataService.users.orderByChild("role").equalTo("judge"));
    }

    function Judge() {

      this.name = '';
      this.email = '';
      this.date = new Date();
      this.status = false;
      this.role = 'judge';
    }
  }

})();