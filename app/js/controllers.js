'use strict';

/* Controllers */

function VersesCtrl($scope) {
  $scope.verses = [
    { title: 'John 1:4', content: 'In him was life, and that life was the light of man' },
    { title: 'Romans 1:16', content: 'I am not ashamed of the gospel, because it is the power of God for the salvation of everyone who believes: first for the Jew, then for the Gentile.'}]
  
  $scope.addVerse = function() {
    $scope.verses.push({title: $scope.verseTitle, content: $scope.verseContent});
    $scope.verseTitle = '';
    $scope.verseContent = '';
  }
}

function MyCtrl2() {
}
MyCtrl2.$inject = [];
