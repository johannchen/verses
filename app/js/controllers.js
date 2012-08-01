'use strict';

/* Controllers */

function VersesCtrl($scope, storage) {
  $scope.verses = storage.getObject('verses');
	$scope.limit = 10;

	$scope.removeVerse = function(index) {
		if(confirm("Are you sure to remove this verse?") == true) {
			$scope.verses.splice(index, 1);
		}
	}

  $scope.showMemorizeForm = function() {
    this.isMemorizing = true;
    this.doneMemorizing = false;
  }

  $scope.hideMemorizeForm = function() {
    this.isMemorizing = false;
  }

	$scope.memorizeVerse = function() {
		//var verse = $scope.verses[index];
    // this access to current scope
		this.diffResult = '';
    var verse = this.verse;
		if (verse.content === this.typedContent) {
			verse.memorized ? ++verse.memorized : verse.memorized = 1;
			verse.last_memorized_at = new Date();
		} else {
			// show diff
			// $scope.diffResult = dmp.diff($scope.typedContent, verse.content);
			var dmp = new diff_match_patch();
			var d = dmp.diff_main(this.typedContent, verse.content);
			dmp.diff_cleanupSemantic(d);
		  this.diffResult = dmp.diff_prettyHtml(d);
      this.doneMemorizing = true;
		}
    this.isMemorizing = false;
    this.typedContent = '';
	}


	//observe and save verses when it change
  //TODO: save the when change completed?
	$scope.$watch('verses', function(newValue, oldValue) {
		storage.saveObject(newValue, 'verses');
	}, true);
}

function NewVerseCtrl($scope, $location, storage) {
  $scope.verses = storage.getObject('verses');
	$scope.addVerse = function() {                                               
	 	$scope.verses.unshift({
			title: $scope.verseTitle, 
			content: $scope.verseContent,
			tags: [],
			created_at: new Date()}); 
		$location.path('/');
		storage.saveObject($scope.verses, 'verses');
	}
}	

function VerseTagsCtrl($scope) {
	$scope.removeTag = function(index) {
		$scope.verse.tags.splice(index, 1);
	}
}

function TagsCtrl($scope) {
	$scope.tags = [
		{name: 'Love'},
		{name: 'Joy'},
		{name: 'Peace'}];
	
	$scope.addTag = function() {
		$scope.tags.push({name: $scope.tagName});
		$scope.tagName = '';
	};

	$scope.deleteTag = function(index) {
		if(confirm("Are you sure to remove this tag?") == true) {
			$scope.tags.splice(index, 1);
		}
	};
}

function MyCtrl2() {
}
MyCtrl2.$inject = [];
