(function() {
  'use strict';

  angular
    .module('app.auth')
    .directive('gzAuthFormRegister', gzAuthFormRegister)
    .directive('fbImageUpload', fbImageUpload)
    .directive('pwCheck', pwCheck);

  function gzAuthFormRegister() {
    return {
      templateUrl: 'app/auth/authFormRegister.html',
      restrict: 'E',
      controller: AuthFormRegisterController,
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

  function fbImageUpload() {
    return {
      link: function(scope, element, attrs) {
        // Modified from https://developer.mozilla.org/en-US/docs/Web/API/FileReader
        var fileReader = new FileReader();
        var fileFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

        fileReader.onload = function (fileReaderEvent) {
          scope.$apply(function () {
            scope.image = fileReaderEvent.target.result;
            scope.vm.user.image = fileReaderEvent.target.result;
          });
        };

        var load_image = function(imageInput) {
          if (imageInput.files.length === 0) { 
            return;
          }

          var file = imageInput.files[0];

          if (!fileFilter.test(file.type)) { 
            scope.error = 'You must select a valid image!';
            scope.$apply();
            return; 
          }else{
            scope.error = '';
          }

          fileReader.readAsDataURL(file);
          scope.$apply();
        };

        element[0].onchange = function() {
          load_image(element[0]);
        };
      },
      restrict: 'A'
    };
  }

  function AuthFormRegisterController() {
    var vm = this;

    vm.user = {
      name: '',
      email: '',
      password: '',
      confirmpassword: '',
      image: ''
    };
  }

function pwCheck() {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            elem.add(firstPassword).on('keyup', function () {
                scope.$apply(function () {

                    ctrl.$setValidity('pwmatch', elem.val() === $('#password').val());
                });
            });
        }
    }
}

})();