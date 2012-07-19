'use strict';

/* Controllers */

function VersesCtrl($scope, storage) {
  $scope.verses = storage.getObject('verses');
  
  $scope.addVerse = function() {
    $scope.verses.push({title: $scope.verseTitle, content: $scope.verseContent});
    $scope.verseTitle = '';
    $scope.verseContent = '';
		storage.saveObject($scope.verses, 'verses');
  }

	$scope.removeVerse = function(index) {
		$scope.verses.splice(index, 1);
		storage.saveObject($scope.verses, 'verses');
	}

	$scope.memorizeVerse = function(index) {
		var verse = $scope.verses[index];
		if (verse.content === verse.typedContent) {
			verse.memorized ? ++verse.memorized : verse.memorized = 1;
		} else {
			// show diff
			// $scope.diffResult = dmp.diff($scope.typedContent, verse.content);
			var dmp = new diff_match_patch();
			var d = dmp.diff_main(verse.typedContent, verse.content);
			dmp.diff_cleanupSemantic(d);
		  verse.diffResult = dmp.diff_prettyHtml(d);
		}
	}
}

function MyCtrl2() {
}
MyCtrl2.$inject = [];
