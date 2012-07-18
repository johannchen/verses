'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var servicesModule = angular.module('myApp.services', []).
  value('version', '0.1');

servicesModule.factory('storage', function() {
	var myStorage = {};

	myStorage.getObject = function(key) {
		var data = [];
		var json_object = localStorage[key];
		if (json_object) {
			data = JSON.parse(json_object);
		}
		return data;
	};

	myStorage.saveObject = function(objectToSave, key) {
		localStorage[key] = JSON.stringify(objectToSave);
	};

	myStorage.supported = function() {
		return 'localStorage' in window && window['localStorage'] !== null;
	};

	return myStorage;
});
