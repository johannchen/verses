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
      var colors = ['white', 'moccasin', 'pink', 'coral', 'khaki', 'tan',
        'lightblue', 'yellowgreen', 'orchid', 'orange', 'limegreen']
			var out = "";
			if (memorizedNum > 0 && memorizedNum <= 10) {
				out = colors[memorizedNum]; 
			} else if (memorizedNum > 10) {
				out = 'limegreen';
			}
			return out;
		}
	});
