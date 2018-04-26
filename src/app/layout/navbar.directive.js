(function() {
  'use strict';

  angular
    .module('app.layout')
    .directive('gzNavbar', function() {
      return {
        templateUrl: 'app/layout/navBar.html',
        restrict: 'E',
        scope: {},
        controller: NavBarController,
        controllerAs: 'vm'
      }
    });
  NavBarController.$inject = ['$location', 'authService', '$rootScope', '$sessionStorage', 'firebaseDataService', 'FIREBASE_URL'];

  function NavBarController($location, authService, $rootScope, $sessionStorage, firebaseDataService, FIREBASE_URL) {
    var vm = this;

    vm.isLoggedIn = authService.isLoggedIn;
    vm.login = authService.login;
    vm.logout = logout;
    vm.changePhoto = changePhoto;
    vm.changepassword = changepassword;
    vm.alert_flag = false;
    vm.alert_message = "";

    if($rootScope.role){

    }else{
      $rootScope.role = $sessionStorage.role;  
    } 
    if($rootScope.photo){

    }else{
      $rootScope.photo = $sessionStorage.photo;  
    }
    if($rootScope.name){

    }else{
      $rootScope.name = $sessionStorage.name;  
    }     

    function logout() {

      authService.logout();
      $location.path('/');
    }

    function changePhoto() {

      $.FileDialog({multiple: true}).on('files.bs.filedialog', function(ev) {
          var files = ev.files;
          var text = "";
          files.forEach(function(f) {
              text += f.name + "<br/>";

              var query = firebaseDataService.users.orderByChild("email").equalTo($sessionStorage.email);

              query.on('value', function(snapshot) {
                  snapshot.forEach(function(weekSnapshot) {
                      weekSnapshot.ref().update({ image: f.content });
                      vm.logout();
                      $location.path('/login');
                  });
              });
          });
          
          $("#output").html(text);
      }).on('cancel.bs.filedialog', function(ev) {
          $("#output").html("Cancelled!");
      });
    }

    function changepassword(current_password, new_password, confirm_password) {

      if (current_password) {
        if (new_password) {
          if (confirm_password) {

            if(new_password != confirm_password) {
              vm.alert_message = "Error: Your confirm password doesn't match.";
              vm.alert_flag = true;
            }else{
              console.log("Here");
              authService.login({email: $sessionStorage.email, password: current_password})
                .then(function(response) {

                   new Firebase(FIREBASE_URL).changePassword({
                      email: $sessionStorage.email,
                      oldPassword: current_password,
                      newPassword: new_password
                    }, function(error) {
                      if (error) {
                        switch (error.code) {
                          case "INVALID_PASSWORD":
                            vm.alert_message = "The specified user account password is incorrect.";
                            vm.alert_flag = true;
                            break;
                          case "INVALID_USER":
                            vm.alert_message = "The specified user account does not exist.";
                            vm.alert_flag = true;
                            break;
                          default:
                            vm.alert_message = "Error changing password:";
                            vm.alert_flag = true;
                        }
                      } else {
                        vm.alert_flag = false;
                        current_password = "";
                        new_password = "";
                        confirm_password = "";
                        vm.logout();
                        $('.close').click();
                        $location.path('/login');
                      }
                    });

                }).catch(function(error) {
                  if (error.code == "INVALID_PASSWORD") {
                    vm.alert_message = "Your password is wrong, Please enter correct password.";
                    vm.alert_flag = true;
                  }                  
                });
            }
          }else{
            vm.alert_message = "Error: Please enter your confirm password.";
            vm.alert_flag = true;
          }
        }else{
          vm.alert_message = "Error: Please enter your new password.";
          vm.alert_flag = true;
        }
      }else{
        vm.alert_message = "Error: Please enter your current password.";
        vm.alert_flag = true;
      }
    }
  }
})();