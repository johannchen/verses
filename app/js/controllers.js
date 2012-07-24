'use strict';

/* Controllers */

function VersesCtrl($scope, storage) {
  $scope.verses = storage.getObject('verses');
  
  $scope.addVerse = function() {
    $scope.verses.push({title: $scope.verseTitle, content: $scope.verseContent});
    $scope.verseTitle = '';
    $scope.verseContent = '';
  }

	$scope.removeVerse = function(index) {
		$scope.verses.splice(index, 1);
	}

	$scope.memorizeVerse = function() {
		//var verse = $scope.verses[index];
    // this access to current scope
    var verse = this.verse;
		if (verse.content === this.typedContent) {
			verse.memorized ? ++verse.memorized : verse.memorized = 1;
      this.typedContent = '';
		} else {
			// show diff
			// $scope.diffResult = dmp.diff($scope.typedContent, verse.content);
			var dmp = new diff_match_patch();
			var d = dmp.diff_main(this.typedContent, verse.content);
			dmp.diff_cleanupSemantic(d);
		  this.diffResult = dmp.diff_prettyHtml(d);
		}
	}

	//observe and save verses when it change
  //TODO: save the when change completed?
	$scope.$watch('verses', function(newValue, oldValue) {
		//console.log("new: " + newValue.length);
		//console.log("old: " + oldValue.length);
		//storage.saveObject($scope.verses, 'verses');
		storage.saveObject(newValue, 'verses');
	}, true);
}

function MyCtrl2() {
}
MyCtrl2.$inject = [];
