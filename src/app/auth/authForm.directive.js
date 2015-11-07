(function() {
  'use strict';

  angular
    .module('app.auth')
    .directive('gzAuthForm', gzAuthForm);

  function gzAuthForm() {
    return {
      templateUrl: 'app/auth/authForm.html',
      restrict: 'E',
      controller: AuthFormController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        submitAction: '&',
        error: '=',
        formTitle: '@'
      },
      transclude: true
    }
  }

  function AuthFormController() {
    var vm = this;

    vm.user = {
      email: '',
      password: ''
    };
  }

})();