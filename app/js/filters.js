'use strict';

/* Filters */

angular.module('myApp.filters', []).
	filter('startFrom', function() {
		return function(input, start) {
			start = +start;
			return input.slice(start);
		}
	}).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);
