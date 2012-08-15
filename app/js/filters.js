'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]).
	filter('bgColor', function() {
		return function(input, memorizedNum) {
			var out = "";
			if (memorizedNum > 0 && memorizedNum < 5) {
				out = 'green'; 
			} else if (memorizedNum >= 5 && memorizedNum < 10) {
				out = 'yellow';
			} else if (memorizedNum >= 10) {
				out = 'orange';
			}
			return out;
		}
	});
