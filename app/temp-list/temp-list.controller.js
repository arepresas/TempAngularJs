'use strict';

angular.
module('TempServer').
controller('TempListController', function($scope, GetTempList) {
    console.log(GetTempList.query());
    $scope.tempList = GetTempList.query();
});