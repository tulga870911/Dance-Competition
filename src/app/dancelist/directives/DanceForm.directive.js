(function() {
  'use strict';

  angular
    .module('app.dancelist')
    .directive('gzDanceForm', gzDanceForm);

  function gzDanceForm() {
    return {
      templateUrl: 'app/dancelist/directives/DanceForm.html',
      restrict: 'E',
      controller: DanceFormController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        dancies: '='
      }
    }
  }

  DanceFormController.$inject = ['DancetypeService', '$timeout', 'JudgeService','$location','DanceService','$scope','authService', '$sessionStorage'];

  function DanceFormController(DancetypeService, $timeout, JudgeService, $location, DanceService, $scope, authService, $sessionStorage) {

    var vm = this;
    vm.addDance = addDance;
    vm.addbutton = addbutton;
    vm.click_addbutton = click_addbutton;
    vm.lock_form = true;

/*------------Initialization----------*/
   
    vm.all_judges = new JudgeService.getJudges();
    vm.all_dancetypes = new DancetypeService.getDancetypes();
    vm.myNumbers = [1,2,3,4,5,6];
    vm.showJudgeSelect = false;
    vm.showDanceTypeSelect = false;
    vm.newDance = [];

    if($sessionStorage.add_dance == true) {

      vm.title = "Add a new Dance";
      vm.lock_form = $sessionStorage.add_dance;
      vm.addBtn_label = "Add a dance";      
      vm.newDance.date = new Date();
      vm.newDance.dancetype = '';
      vm.newDance.result = '';
      vm.newDance.judges = '';    
      vm.newDance.state = "Upcoming";
      vm.number = [];
      vm.couple = [];

    } else{
      vm.newDance = $sessionStorage.dance;
      vm.lock_form = $sessionStorage.add_dance;

      vm.newDance.date = new Date(vm.newDance.date);

      var dancers = vm.newDance.dancers;
      var key = [];
      var value = [];

      for(var i = 0;i < dancers.length;i ++) {
        key[i + 1] = (dancers[i].key);
        value[i + 1] = (dancers[i].value);
      }
      vm.number = key;
      vm.couple = value;
      vm.title = "Change the Dance info";
      vm.addBtn_label = "Save the change";
      vm.result = vm.newDance.result;
    }

/*------------The end of Initialization-------*/

    function addDance() {

      var date = vm.newDance.date;
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = 1900 + date.getYear();
      vm.newDance.date = year + '-' + month + '-' + day;

//insert dancers
      
      var dancers = [];      
      var key = '';
      var value = '';

      for(var i = 1;i < 7; i ++){

        key = vm.number[i];
        value = vm.couple[i];
        var obj ={};
        obj[key] = value;
        dancers.push({key:key,value:value});
      }
      vm.newDance.dancers = dancers;

//add Result schedule
      
      var judges = [];
      var all_judges = vm.all_judges;
      var obj = {};
      for(var i = 0;i < all_judges.length;i ++){

          key = all_judges[i].$id;
          obj[key] = "";
          judges[i] = obj;
      }      
      vm.newDance.result = judges[0];

      if($sessionStorage.add_dance == true) {
        vm.dancies.$add(vm.newDance);
      }else{
        console.log("updated dance = ",vm.newDance);
        vm.newDance.result = vm.result;
        new DanceService.updateDance(vm.newDance);
        $location.path('/dancelist');  
      }
      vm.newDance = new DanceService.Dance();
      $location.path('/dancelist');
    }

/**
  *
  Modified by Batu
  *
  */

    var checkJudgeList = function(){
      if (vm.all_judges.length == 0){
        $timeout(checkJudgeList, 500);
        return;
      }
      vm.all_judges.pop();
      $timeout(visual1)
    }

    var visual1 = function(){
      
      $('#multi-select-judge').multiSelect({
        selectableHeader: "<div class='custom-header'>Selectable Judges</div>",
        selectionHeader: "<div class='custom-header'>Selection Judges</div>",
        // selectableFooter: "<div class='custom-header'>Selectable footer</div>",
        // selectionFooter: "<div class='custom-header'>Selection footer</div>",
        afterSelect: function(values){
        },
        afterDeselect: function(values){
        }
      });
      vm.showJudgeSelect = true;
    }

    var visual2 = function(){
      if (vm.all_dancetypes.length == 0){
        $timeout(visual2, 500);
        return;
      }
      $('#multi-select-dance').multiSelect({
        selectableHeader: "<div class='custom-header'>Selectable Types</div>",
        selectionHeader: "<div class='custom-header'>Selection Types</div>",
        // selectableFooter: "<div class='custom-header'>Selectable footer</div>",
        // selectionFooter: "<div class='custom-header'>Selection footer</div>",
        afterSelect: function(values){
        },
        afterDeselect: function(values){
        }
      });
      vm.showDanceTypeSelect = true;
    }

    $timeout(checkJudgeList, 500);
    $timeout(visual2, 500);

    function addbutton(){
      $(function () {
        $('.addbutton').css('visibility', 'visible');
      });
      // couple_group
    }

    function click_addbutton(){
      $(function () {
        $('.addbutton').remove();
        $('.couple_group').append("<div class='row'><div class='col-sm-3'><label class='control-label' for='icon'>1<sup>st</sup> Couple</label></div><div class='col-sm-4'><input type = 'number' ng-keypress = 'vm.addbutton()' class = 'form-control' ng-model = 'vm.newDance.dancers' name='couple_number[]' placeholder = 'Couple Number'/></div><div class='col-sm-5'><input type = 'text' class = 'form-control' ng-model = 'vm.newDance.dancers' name='couple_name[]' placeholder = 'Couple Name'/></div></div><div class = 'row'><div class='col-md-3 col-sm-3 pull-right-sm pull-right'><span ng-click = 'vm.click_addbutton()' class='addbutton btn btn-block btn-default' style = 'visibility: hidden;opacity:0.6' ng-disabled='vm.lock_form'>Add New</span></div></div>");
      });
    }
  }

})();
