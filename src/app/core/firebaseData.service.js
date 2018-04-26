(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('firebaseDataService', firebaseDataService);

  firebaseDataService.$inject = ['FIREBASE_URL'];

  function firebaseDataService(FIREBASE_URL  ) {
    var root = new Firebase(FIREBASE_URL);

    var service = {
      root: root,
      dances: root.child('dances'),
      users: root.child('users'),
      dancetypes: root.child('dancetypes')
    };

    return service;
  }

})();