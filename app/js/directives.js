'use strict';

/* Directives */


var directivesModule = angular.module('myApp.directives', []);

directivesModule.directive('appVersion', ['version', function(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
}]);

directivesModule.directive('ngEnter', function() {
  return function(scope, elm, attrs) {
    elm.bind('keypress', function(e) {
      if(e.charCode === 13) scope.$apply(attrs.ngEnter);
    });
  };
});

directivesModule.directive('editableText', function() {
  return {
    restrict: 'A',
    scope: { localModel: '=model' },
    template: '<span ng-hide="editMode" ng-click="editMode=true">{{localModel}}</span>' +
      '<input type="text" ng-model="localModel" ng-show="editMode" ng-enter="editMode=false" />'
  }
});

directivesModule.directive('editableTextarea', function() {
  return {
    restrict: 'A',
    scope: { localModel: '=model' },
    template: '<div ng-hide="editMode" ng-click="editMode=true">{{localModel}}</div>' +
      '<textarea rows="10" cols="50" ng-model="localModel" ng-show="editMode" ng-enter="editMode=false"></textarea>'
  } 
});

/* tutorial code 
directivesModule.directive('jcEditableTextarea', function() {
  var editTemplate = '<textarea ng-show="isEditMode" ng-dblclick="switchToPreview()" rows="10" cols="30" ng-model="editTextArea"></textarea>';
  var previewTemplate = '<div ng-hide="isEditMode" ng-dblclick="switchToEdit()">Preview</div>';
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
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
  }
});
*/
