'use strict';

/* Directives */
angular.module('myApp.directives', []).
	directive('appVersion', ['version', function(version) {
		return function(scope, elm, attrs) {
			elm.text(version);
		};
	}]).
	directive('bibleAutocomplete', function() {
		var bible = [
			"Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
	    "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
			"1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles",
		  "Ezra", "Nehemiah", "Esther",
		  "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Songs",
		  "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel",
		  "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah",
		  "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
		  "Matthew", "Mark", "Luke", "John", "Acts",
		  "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
		  "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
		  "1 Timothy", "2 Timothy", "Titus", "Philemon",
		  "Hebrews", "James", "1 Peter", "2 Peter",
		  "1 John", "2 John", "3 John", "Jude", "Revelation"
		];
		return {
      retrict: 'A', 
      link: function(scope, elm, attrs) {
        elm.autocomplete({source: bible});
      } 
		};
	}).
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
			      //$(this).find('.tags').html(ui.draggable.text());
						//model.push(ui.draggable.text());
						//model view does not reflect the value change
						//console.log(scope);
            if (typeof scope.verse.tags === 'undefined') scope.verse.tags = [];
						scope.verse.tags.push($.trim(ui.draggable.text()));
						scope.$apply();
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
			scope: { model: '=' },
			template: '<span ng-hide="editMode" ng-dblclick="editMode=true">{{model}}</span>' +
				'<input type="text" class="span2" autofocus="autofocus" ng-model="model" ng-show="editMode" jc-enter="editMode=false" />'
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
