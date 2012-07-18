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
}

function MyCtrl2() {
}
MyCtrl2.$inject = [];
