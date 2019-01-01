'use strict';

// Declare app level module which depends on views, and core components
angular.module('TempServer').
config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/tempServer', {
        template: '<temp-list></temp-list>'
    }).
    otherwise({redirectTo: '/tempServer'});
}]);