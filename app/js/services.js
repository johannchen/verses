'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var servicesModule = angular.module('myApp.services', []).
  value('version', '0.1');

servicesModule.factory('IndexedDB', function() {

});
