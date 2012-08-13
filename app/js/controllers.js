'use strict';

/* Controllers */

function VersesCtrl($scope, $http, storage) {
  $scope.verses = storage.getObject('verses');
  $scope.memorized = false;

  $scope.getESV = function() {
    var esvUrl = '/bible/' + $scope.verseTitle;
    $http({method: 'GET', url: esvUrl}).
      success(function(data, status) {
        $scope.verseContent = data.esv;
      }).
      error(function(data, status) {
        $scope.verseContent = "Failed to load ESV";
    });
  }

	$scope.memorizedCount = function() {
		var count = 0;
		angular.forEach($scope.verses, function(verse) {
			count += verse.memorized > 0 ? 1 : 0;
		});
		return count;
	}

  $scope.newVerse = function() {
    $scope.isAddingVerse = true;
  }
  
  $scope.cancelNewVerse = function() {
    $scope.isAddingVerse = false;
    $scope.verseTitle = "";
    $scope.verseContent = "";
  }

  $scope.addVerse = function() {                                               
	 	$scope.verses.unshift({
			title: $scope.verseTitle, 
			content: $scope.verseContent,
			tags: [],
      memorized: 0,
			created_at: new Date()}); 
    $scope.verseTitle = "";
    $scope.verseContent = "";
  }

	$scope.addVerseClose = function() {                                               
    $scope.addVerse();
	 	$scope.isAddingVerse = false;
  }

  $scope.addVerseOpen = function() {                                        
    $scope.addVerse();
	 	$scope.isAddingVerse = true;
  }

	$scope.removeVerse = function(verse) {
		if(confirm("Are you sure to remove this verse?") == true) {
      var index = $scope.verses.indexOf(verse);
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
    // this access to current scope
		this.diffResult = '';
    var verse = this.verse;
		if (verse.content === this.typedContent) {
			verse.memorized ? ++verse.memorized : verse.memorized = 1;
			verse.last_memorized_at = new Date();
		} else {
			// show diff
			//this.diffResult = dmp.diff($scope.typedContent, verse.content);
			var dmp = new diff_match_patch();
			var d = dmp.diff_main(this.typedContent, verse.content);
			dmp.diff_cleanupSemantic(d);
		  this.diffResult = dmp.diff_prettyHtml(d);
      this.doneMemorizing = true;
		}
    this.isMemorizing = false;
    this.typedContent = '';
	}

  $scope.exportVerses = function() {
    var output = document.querySelector('output');
    window.URL = window.webkitURL || window.URL;
 
    var prevLink = output.querySelector('a');
    if (prevLink) {
      window.URL.revokeObjectURL(prevLink.href);
      output.innerHTML = '';
    }

    var a = document.createElement('a');
    a.download = 'verses.txt';
    a.href = window.URL.createObjectURL(storage.getExportBlob('verses'));
    a.textContent = 'Download';

    output.appendChild(a);
    a.onclick = function(e) {
      // clean up
      // Need a small delay for the revokeObjectURL to work properly.
      setTimeout(function() {
        window.URL.revokeObjectURL(a.href);
      }, 1500);
      output.innerHTML = '';
    };
  }

  $scope.filterByMemorized = function(item) {
    if($scope.memorized) {
      return item.memorized > 0;
    }
    return true;
  };

  $scope.selectFilter = function() {
		// filter by memorized 
		if (typeof($scope.search) === 'undefined') $scope.search = {};
		if ($scope.selectedFilter === "") {
			$scope.search.memorized = "";
      $scope.memorized = false;
    } else if ($scope.selectedFilter === "unmemorized") {
			$scope.search.memorized = "0";
      $scope.memorized = false;
		} else {
			$scope.search.memorized = "" ;
      $scope.memorized = true;
		}
	};

	//observe and save verses when it change
  //TODO: save the when change completed?
	$scope.$watch('verses', function(newValue, oldValue) {
		storage.saveObject(newValue, 'verses');
  }, true);
}

function VerseTagsCtrl($scope) {
	$scope.removeTag = function(index) {
		$scope.verse.tags.splice(index, 1);
	}
}

function TagsCtrl($scope, storage) {
	$scope.tags = storage.getObject('tags');
  /*
  var lastId = 0,
    lastIndex = $scope.tags.length - 1;
  if (lastIndex >=  0) { lastId = $scope.tags[lastIndex].id; }
  var nextId = lastId + 1;
*/ 
  $scope.addTag = function() {
		$scope.tags.push({
  //    id: nextId, 
      name: $scope.tagName
    });
		$scope.tagName = '';
 //   nextId++;
	};

	$scope.deleteTag = function(tag) {
		if(confirm("Are you sure to remove this tag?") == true) {
      var index = $scope.tags.indexOf(tag);
			$scope.tags.splice(index, 1);
		}
	};

  $scope.selectTag = function() {
		// filter by tag name
		if (typeof($scope.$parent.search) === 'undefined') $scope.$parent.search = {};
		if (this.selectedTag == null) {
			$scope.$parent.search.tags = "";
		} else {
			$scope.$parent.search.tags = this.selectedTag.name;
		}
	};

  $scope.exportTags = function() {
    var output = document.querySelector('#download-tags');
    window.URL = window.webkitURL || window.URL;
 
    var prevLink = output.querySelector('a');
    if (prevLink) {
      window.URL.revokeObjectURL(prevLink.href);
      output.innerHTML = '';
    }

    var a = document.createElement('a');
    a.download = 'tags.txt';
    a.href = window.URL.createObjectURL(storage.getExportBlob('tags'));
    a.textContent = 'Download';

    output.appendChild(a);
    a.onclick = function(e) {
      // clean up
      // Need a small delay for the revokeObjectURL to work properly.
      setTimeout(function() {
        window.URL.revokeObjectURL(a.href);
      }, 1500);
      output.innerHTML = '';
    };
  };

	$scope.$watch('tags', function(newValue, oldValue) {
		storage.saveObject(newValue, 'tags');
	}, true);
}

function MyCtrl2() {
}
MyCtrl2.$inject = [];
