(function() {
  'use strict';

  angular
    .module('app.auth')
    .factory('authService', authService);

  authService.$inject = ['$rootScope', '$firebaseAuth', '$firebaseObject', 'firebaseDataService'];

  function authService($rootScope, $firebaseAuth, $firebaseObject, firebaseDataService) {
    var firebaseAuthObject = $firebaseAuth(firebaseDataService.root);

    var currentUser;

    firebaseAuthObject.$onAuth(function(auth) {

      currentUser = auth;
    });

    var service = {
      firebaseAuthObject: firebaseAuthObject,
      register: register,
      login: login,
      logout: logout,
      role: '',
      isLoggedIn: isLoggedIn,
      sendWelcomeEmail: sendWelcomeEmail,
      getUserByEmail: getUserByEmail
    };

    return service;

    ////////////

    function register(user) {
      return firebaseAuthObject.$createUser(user);
    }

    function login(user) {
      return firebaseAuthObject.$authWithPassword(user);
    }

    function logout() {
      $rootScope.$broadcast('logout');
      firebaseAuthObject.$unauth();
      window.localStorage.removeItem("firebase:session::<localhost>");
    }

    function isLoggedIn() {
      return currentUser;
    }

    function sendWelcomeEmail(user) {

      var date = new Date();
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = 1900 + date.getYear();
      date = year + '-' + month + '-' + day;

      firebaseDataService.users.push({
        email: user.email,
        name: user.name,
        date: date,
        role: 'judge',
        status: 'false',
        image: user.image
      });
    }

    function getUserByEmail(email){
      return $firebaseObject(firebaseDataService.users.orderByChild("email").equalTo(email));
    }

  }

})();