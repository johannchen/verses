'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
var servicesModule = angular.module('myApp.services', []);

servicesModule.value('version', '0.1');
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

  myStorage.getString = function(key) {
    return localStorage[key];
  };

	myStorage.saveObject = function(objectToSave, key) {
		localStorage[key] = JSON.stringify(objectToSave);
	};

  myStorage.getExportBlob = function(key) {
    window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder ||
      window.MozBlobBuilder;
    var mime_type = "text/plain";
    var bb = new BlobBuilder();
    bb.append(myStorage.getString(key));
    return bb.getBlob(mime_type);
  };

	myStorage.supported = function() {
		return 'localStorage' in window && window['localStorage'] !== null;
	};

	return myStorage;
});

/*
servicesModule.factory('esv', function($resource) {
  return $resource('http://www.esvapi.org/v2/rest/passageQuery?key=IP' +
    '&passage=:passage' +
    '&output-format=plain-text' +
    '&include-short-copyright=0' +
    '&include-passage-horizontal-lines=0' +
    '&include-passage-references=0' +
    '&include-headings=0' +
    '&include-footnotes=0' +
    '&include-verse-numbers=0' +
    '&include-first-verse-numbers=0' +
    '&include-heading-horizontal-lines=0' +
    '&callback=:callback', 
    {passage: 'John3:16',
     callback:'JSON_CALLBACK'},
    {get:{method:'JSONP'}});
});

*/
/*
servicesModule.factory('dmp', function() {
	//return new diff_match_patch();
	var myDmp = {};
	myDmp.diff = function(text1, text2) {
		var newDmp = new diff_match_patch();
		var d = newDmp.diff_main(text1, text2);
		newDmp.diff_cleanupSemantic(d);
		return newDmp.diff_prettyHtml(d);
	};
	return myDmp;
});
*/


/*
servicesModule.value('chromeStorage', chrome.storage && chrome.storage.sync || {
  set: function(data, fn) {
    localStorage.setItem('storage', JSON.stringify(data));
    setTimeout(function() {
      fn();
    }, 0);
  },
  get: function(keys, fn) {
    setTimeout(function() {
      fn(JSON.parse(localStorage.getItem('storage') || '{}'));
    }, 0);
  }  
});

servicesModule.factory('storage', function($rootScope, chromeStorage) {
  return {
    get: function(keys, fn) {
      chromeStorage.get(keys, function(data) {
        $rootScope.$apply(function() {
          fn(data);
        });
      });
    },
    set: function(data, fn) {
      chromeStorage.set(data, function() {
        $rootScope.$apply(function() {
          fn();
        });
      });
    }
  };
});
*/