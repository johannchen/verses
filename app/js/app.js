'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/verses.html', controller: VersesCtrl});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);

// drag and drop file
/*
var import = document.getElementById('import');

import.ondragover = function() { this.className = 'hover'; return false; };
import.ondragend = function() { this.className = ''; return false; };
import.ondrop = function(e) {
  this.className = '';
  e.preventDefault();

  var file = e.dataTransfer.files[0],
    reader = new FileReader();
  reader.onload = function(event) {
    console.log(event.target);
  };

  reader.readAsDataURL(file);

  return false;
};
*/
