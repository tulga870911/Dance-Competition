(function() {
  'use strict';

  angular
    .module('app.dancelist')
    .directive('gzDanceTable', gzDanceTable)
    .directive('gzResultForm', gzResultForm);

  function gzDanceTable() {
    return {
      templateUrl: 'app/dancelist/directives/DanceTable.html',
      restrict: 'E',
      controller: DanceTableController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        dancies: '='
      }
    }
  }

  function gzResultForm() {
    return {
      templateUrl: 'app/dancelist/directives/showResult_Form.html',
      restrict: 'E',
      controller: DanceTableController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        dancies: '='
      }
    }
  }

  DanceTableController.$inject = ['DanceService','$rootScope','$location','JudgeService','$sessionStorage'];

  function DanceTableController(DanceService, $rootScope, $location, JudgeService, $sessionStorage) {


/*----Initialization of controller-----------*/
    var vm = this;

    vm.removeDance = removeDance;
    vm.saveChange = saveChange;
    vm.showResult = showResult;
    vm.get_mark_info = get_mark_info;
    vm.all_judges = new JudgeService.getJudges();
    vm.judge_name = [];
    vm.judge_mark = [];
    vm.judge_photo = [];
    vm.next_prevBtn = next_prevBtn;
    vm.title = [];
    vm.index_dancer = 0;
    vm.index_dancetype = 0;
    vm.dance = [];
    vm.select_type = "dancer";

    $rootScope.judge_name = $sessionStorage.judge_name;
    $rootScope.judge_mark = $sessionStorage.judge_mark;
    $rootScope.judge_photo = $sessionStorage.judge_photo;
    $rootScope.marking_title = $sessionStorage.title;
    $rootScope.dancetype_title = $sessionStorage.dancetype_title;

/*----The end of the initialization-------------*/

    function removeDance(Dance) {
      vm.dancies.$remove(Dance);
    }

    function saveChange(Dance) {

      $sessionStorage.add_dance = false;
      $sessionStorage.dance = Dance;
      $location.path('/addDanceInfo');
    }

    function showResult(Dance) {

      if(isEmpty(Dance)){
        vm.dance = $sessionStorage.dance;
      }else{
        $sessionStorage.dance = Dance;
        vm.dance = $sessionStorage.dance;
      }

      var all_dancers = vm.dance.dancers;
      var all_dancetype = vm.dance.dancetype;
      var dancers_info = [];
      var title = '';

      vm.title = all_dancers[vm.index_dancer].key + " - " + all_dancers[vm.index_dancer].value;// 123 - kjdf
      vm.dancetype_title = all_dancetype[vm.index_dancetype]; // "CORRIDOS"

      dancers_info = get_mark_info(vm.dancetype_title, all_dancers[vm.index_dancer].key, title ,vm.dance, vm.all_judges);

      console.log("dance_info", dancers_info);

      for(var i = 0;i < dancers_info.length;i ++) {

        vm.judge_name[i] = dancers_info[i].key;
        vm.judge_mark[i] = dancers_info[i].value;
        vm.judge_photo[i] = dancers_info[i].photo;
      }

      $sessionStorage.judge_name = vm.judge_name;
      $sessionStorage.judge_photo = vm.judge_photo;
      $sessionStorage.judge_mark = vm.judge_mark;
      $sessionStorage.marking_title = vm.title;
      $sessionStorage.dancetype_title = vm.dancetype_title;

      $rootScope.judge_name = vm.judge_name;
      $rootScope.judge_mark = vm.judge_mark;
      $rootScope.judge_photo = vm.judge_photo;
      $rootScope.marking_title = vm.title;
      $rootScope.dancetype_title = vm.dancetype_title;

      $location.path('/showResult');

    }

/*---------------------------------------------------------------*/
/*-----Get the marks of judges, given dancetype and dancer-------*/
/*-----[dancetype: CORRIDOS, dancer: 112, Dance: object] --------*/

  function get_mark_info(dancetype, dancer, title ,Dance, judges){

      
      var result = [];
      var judge_name = ""; 
      var judge_photo = "";     

      angular.forEach(Dance.result, function(value, key){

        var judges_id = key;  /*ID of Judge*/        
        
        var all_judges = [];
        var all_judges_photo = [];

          angular.forEach(judges, function(value, key){

            if(value.$id == judges_id){

              judge_name = value.name;
              judge_photo = value.image;
            }
          });

          var judge_info = value;
          angular.forEach(judge_info, function(value, key){

            var dancetype_info = value;
            angular.forEach(dancetype_info, function(value, key){

              var marksperdancetype = value;
              var dance_name = key;
              for(var i = 0;i < marksperdancetype.length;i ++) {
                if(marksperdancetype[i].key == dancer && dance_name == dancetype){
                    result.push({key:judge_name, value:marksperdancetype[i].value, photo:judge_photo});
                }
              }
            });
          })
      });
      return result;

    }

    function next_prevBtn(flag) {

      if(flag == false) {

        if (vm.select_type == 'dancer') {

          if(vm.index_dancer == 0){

          }else{
            vm.index_dancer --;
            vm.showResult(vm.dance);
          }  
        }else{

          if(vm.index_dancetype == 0){

          }else{
            vm.index_dancetype --;
            vm.showResult(vm.dance);
          } 

        }              

      }else{
        if (vm.select_type == 'dancer') {

          if(vm.index_dancer == 5){

          }else{

            vm.index_dancer ++;
            vm.showResult(vm.dance);
          }

        }else{

          if(vm.index_dancetype == $sessionStorage.dance.dancetype.length - 1){

          }else{

            vm.index_dancetype ++;
            vm.showResult(vm.dance);
          }

        }
      }
    }

    function isEmpty(obj) {

      // null and undefined are "empty"
      if (obj == null) return true;

      // Assume if it has a length property with a non-zero value
      // that that property is correct.
      if (obj.length > 0)    return false;
      if (obj.length === 0)  return true;

      // Otherwise, does it have any properties of its own?
      // Note that this doesn't handle
      // toString and valueOf enumeration bugs in IE < 9
      for (var key in obj) {
          if (hasOwnProperty.call(obj, key)) return false;
      }

      return true;
  }
  }

/*-----------The end of show Result Part---------*/

})();