(function() {
  'use strict';

  angular
    .module('app.markinglist')
    .animation('.slide', function () {
      return {
        beforeAddClass : function(element, className, done) {

          if (className === 'ng-hide') {
            element.animate({
              opacity: 0
            },500, done);
          } else {
            done();
          }
        },
        removeClass : function(element, className, done) {

          if (className === 'ng-hide') {
          element.css('opacity',0);
          element.animate({
              opacity: 1
            }, 500, done);
          } else {
            done();
          }
        }
      };
    })
    .directive('gzMarkingForm', gzMarkingForm);

  function gzMarkingForm() {
    return {
      templateUrl: 'app/markinglist/directives/MarkingForm.html',
      restrict: 'E',
      controller: MarkingFormController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        dancies: '='
      }
    }
  }

  MarkingFormController.$inject = ['JudgeService','$location', 'DanceService','DancetypeService', 'authService', '$firebaseArray', 'firebaseDataService','$rootScope','$sessionStorage'];

  function MarkingFormController(JudgeService, $location, DanceService,DancetypeService, authService, $firebaseArray, firebaseDataService, $rootScope, $sessionStorage) {

    var vm = this;

    vm.hover = hover;
    vm.getJudgebyemail = getJudgebyemail;
    vm.coupleclick = coupleclick;
    vm.valueclick = valueclick;
    vm.dance = $sessionStorage.SessionMessage;
    vm.marking_finish_flag = true;
    vm.save_marking = save_marking;
    vm.obj_dancetype = [];
    vm.obj_judge = [];
    vm.show_index = 0;
    vm.panel_flag = $sessionStorage.panel_flag;

    console.log("panel_flag", vm.panel_flag);

    var currentUser = authService.isLoggedIn();
    var all_judges = new JudgeService.getJudges();
/**
 *
 hover event jquery
 *
 */
    function getJudgebyemail(all_judges, email){
      for(var i = 0; i < all_judges.length; i ++) {
        if(all_judges[i].email == email){
          return all_judges[i];
        }
      }
    }
    function hover(flag) {   

      if(flag){
        $(this).addClass('hover');
      }else{
        $(this).removeClass('hover');
      }      
          
    }

    function coupleclick($event){

      $(event.target).addClass('marking_element_elected');
    }
    function valueclick($event,$index){

      var index = $index + 1;
      $(event.target).addClass('marking_value_selected');
      $(event.target).attr('disabled','true');
      var elected_element = $('.tr_dancers').find('.marking_element_elected');
      if (elected_element){
        elected_element.removeClass('marking_element_elected');
        elected_element.addClass('marking_element_selected');
        var span = $('<span class = "special_mark">' + index + '</span>');
        if(!elected_element.has('span').length){
          elected_element.append(span);
          elected_element.attr('disabled','true');         
        }

      } else{
        alert('all_selected');
        vm.marking_finish_flag = false;
      }
    }

    function save_marking($event, dancetype, $index) {

      var selected_couple = $('div#form' + $index + ' table tr.tr_dancers').find('.marking_element_selected');

      if(selected_couple.length == $('div#form' + $index + ' table.marking_table').find('.tr_dancers').length){

        var dancetype_result = [];        
        var key = '';
        var value = '';
        var i = 0;
        selected_couple.each(function() {

            i++;
            key = $(this).text().slice(0,-1);
            value = $(this).find('span').html();
            var obj ={};
            obj[key] = value;
            dancetype_result.push({key:key,value:value});

        });

        var obj_judge = {};
        obj_judge[dancetype] = dancetype_result;
        vm.obj_dancetype.push(obj_judge);

/*Remove the form and show the next form*/
        console.log(vm.panel_flag);
        vm.panel_flag.unshift(true);
        vm.panel_flag.pop();
        console.log(vm.panel_flag);

        if(vm.dance.dancetype.length == $index + 1){

          var selected_judge = vm.getJudgebyemail(all_judges, currentUser.password.email);         
          var ref = firebaseDataService.dances.child(vm.dance.$id);
          firebaseDataService.dances.child(vm.dance.$id).child('result').child(selected_judge.$id).set(vm.obj_dancetype);       
          $location.path('/markinglist');
          alert('Successfully Marked!');
        }

      }else{
        alert('please fill out marking!');
      }

    }

    function saveChange() {

      var date = vm.newDance.date;
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = 1900 + date.getYear();
      vm.newDance.date = year + '-' + month + '-' + day;

      vm.dancies.$save(vm.newDance);
      vm.newDance = new DanceService.Dance();
      $location.path('/dancelist');
    }

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
