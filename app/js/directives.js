'use strict';

/* Directives */


var directivesModule = angular.module('myApp.directives', []);

directivesModule.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

directivesModule.directive('jcEditableTextarea', function() {
  /*
  var editTemplate = '<textarea ng-show="isEditMode" ng-dblclick="switchToPreview()" rows="10" cols="30" ng-model="editTextArea"></textarea>';
  var previewTemplate = '<div ng-hide="isEditMode" ng-dblclick="switchToEdit()">Preview</div>';
  */
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    require: '?ngModel',
    scope: { 'ngModel': 'attribute'},
    template: '<textarea rows="10" cols="30" ng-transclude></textarea>'
    /*
    compile: function(tElement, tAttrs, transclude) {
      var editTextArea = tElement.text();
      tElement.html(editTemplate);
      var previewElement = angular.element(previewTemplate);
      tElement.append(previewElement);

      return function(scope, element, attrs) {
        scope.isEditMode = false;
        scope.editTextArea = editTextArea;

        scope.switchToPreview = function() {
          previewElement.html(scope.editTextArea);
          scope.isEditMode = false;
        }
        scope.switchToEdit = function() {
          scope.isEditMode = true;
        }
      }
    }
    */
  }
});
