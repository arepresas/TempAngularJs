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