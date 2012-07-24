'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/verses.html', controller: VersesCtrl});
    $routeProvider.when('/new', {templateUrl: 'partials/newVerse.html', controller: NewVerseCtrl});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
