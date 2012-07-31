'use strict';

/* Directives */


angular.module('myApp.directives', []).
	directive('appVersion', ['version', function(version) {
		return function(scope, elm, attrs) {
			elm.text(version);
		};
	}]).
  directive('jcDraggable', function() {
		return {
      retrict: 'A', 
      link: function(scope, elm, attrs) {
        elm.draggable({revert: true});
      } 
		};
	}).
  directive('jcDroppable', function() {
		return {
      retrict: 'A',
      link: function(scope, elm, attrs) {
	      elm.droppable({
		      drop: function(event, ui) {
			      $(this).find('.tags').html(ui.draggable.text());
		      }
	      });
      }
    };
	}).
  directive('jcEnter', function() {
		return function(scope, elm, attrs) {
			elm.bind('keypress', function(e) {
				if(e.charCode === 13) scope.$apply(attrs.jcEnter);
			});
		};
	}).
	directive('jcEditableText', function() {
		return {
			restrict: 'A',
			//scope: { localModel: '=model' },
			scope: { model: '=' },
			template: '<span ng-hide="editMode" ng-dblclick="editMode=true">{{model}}</span>' +
				'<input type="text" ng-model="model" ng-show="editMode" jc-enter="editMode=false" />'
		}
	}).
	directive('jcEditableTextarea', function() {
		return {
			restrict: 'A',
			scope: { model: '=' },
			template: '<div ng-hide="editMode" ng-dblclick="editMode=true">{{model}}</div>' +
				'<textarea rows="10" class="input-xlarge" ng-model="model" ng-show="editMode" ng-dblclick="editMode=false"></textarea>'
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
