(function() {
  'use strict';

  angular
    .module('app.judgelist')
    .directive('fbImageUpload', fbImageUpload)
    .directive('gzJudgeForm', gzJudgeForm);

  function gzJudgeForm() {
    return {
      templateUrl: 'app/judgelist/directives/JudgeForm.html',
      restrict: 'E',
      controller: JudgeFormController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        judges: '='
      }
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

  JudgeFormController.$inject = ['JudgeService'];

  function JudgeFormController(JudgeService) {
    
    var vm = this;

    vm.newJudge = new JudgeService.Judge();
    vm.addJudge = addJudge;

    function addJudge() {
    
      var date = vm.newJudge.date;
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = 1900 + date.getYear();
      vm.newJudge.date = year + '-' + month + '-' + day;
      vm.judges.$add(vm.newJudge);
      vm.newJudge = new JudgeService.Judge();
    }
  }

})();
