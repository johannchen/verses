'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/verses.html', controller: VersesCtrl});
    $routeProvider.when('/about', {templateUrl: 'partials/about.html'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
