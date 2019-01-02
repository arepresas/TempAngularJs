'use strict';

angular.
module('TempServer').
factory('GetTempList', ['$resource',
    function($resource) {
        return $resource('http://arepresas-tempserver.appspot.com/tempdata/getList', {}, {
            query: {
                method: 'GET',
                params: {},
                isArray: true
            }
        });
    }
]);

angular.
module('TempServer').
factory('GetLastTemp', ['$resource',
    function($resource) {
        return $resource('http://arepresas-tempserver.appspot.com/tempdata/getLast', {}, {
            query: {
                method: 'GET',
                params: {},
                isArray: false
            }
        });
    }
]);