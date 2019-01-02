'use strict';

angular.module('TempServer').controller('TempListController', TempListController);

TempListController.$inject = ['$scope', '$filter', 'GetTempList', 'GetLastTemp'];

function TempListController(scope, filter, GetTempList, GetLastTemp) {

    // TempList graph
    GetTempList.query({}, function (content) {
        initList(content);
    });

    // Properties for TempList graph
    let rows = [];
    scope.tempListChartObject = {};

    //Methods for TempList graph
    scope.hideSeries = hideSeries;

    function hideSeries(selectedItem) {
        let col = selectedItem.column;
        if (selectedItem.row === null) {
            if (scope.tempListChartObject.view.columns[col] == col) {
                scope.tempListChartObject.view.columns[col] = {
                    label: scope.tempListChartObject.data.cols[col].label,
                    type: scope.tempListChartObject.data.cols[col].type,
                    calc: function() {
                        return null;
                    }
                };
                scope.tempListChartObject.options.colors[col - 1] = '#CCCCCC';
            }
            else {
                scope.tempListChartObject.view.columns[col] = col;
                scope.tempListChartObject.options.colors[col - 1] = scope.tempListChartObject.options.defaultColors[col - 1];
            }
        }
    }

    function initList(tempList) {
        scope.tempListChartObject.type = "LineChart";
        scope.tempListChartObject.displayed = false;
        tempList.forEach(function(temp) {
            rows.push({
                "c": [{
                    // "v": filter('date')(temp.dateTime.seconds * 1000, 'dd/MM/yyyy')
                    "v": new Date(temp.dateTime.seconds * 1000)
                }, {
                    "v": temp.temperature,
                    "f": temp.temperature.toString()
                }, {
                    "v": temp.humidity,
                    "f": temp.humidity.toString()
                }]
            });
        });
        scope.tempListChartObject.data = {
            "cols": [{
                id: "date",
                label: "Date",
                type: "date"
            }, {
                id: "temperature",
                label: "Temperature",
                type: "number"
            }, {
                id: "humidity",
                label: "Humidity",
                type: "number"
            }],
            "rows": rows
        };
        scope.tempListChartObject.options = {
            "title": "Temperature and humidity in room",
            "colors": ['#009900', '#0000FF'],
            "defaultColors": ['#009900', '#0000FF'],
            "isStacked": "true",
            "fill": 50,
            "displayExactValues": true,
            "vAxis": {
                "title": "Value (°C and %)",
                "gridlines": {
                    "count": 20
                }
            },
            "hAxis": {
                "title": "Date"
            }
        };
        scope.tempListChartObject.view = {
            columns: [0, 1, 2]
        };
    }

    // LastTemp and LastHumidity graph
    GetLastTemp.query({}, function (content) {
        scope.lastTempChartObject.data = [
            ['Label', 'Value'],
            ['Temperature', content.temperature]
        ];
        scope.lastHumidityChartObject.data = [
            ['Label', 'Value'],
            ['Humidity', content.humidity]
        ];
    });

    // Properties for LastTemp graph
    scope.lastTempChartObject = {};
    scope.lastTempChartObject.type = "Gauge";

    // Methods for LastTemp graph
    scope.lastTempChartObject.options = {
        width: 400,
        height: 120,
        blueFrom: 0,
        blueTo: 5,
        yellowFrom: 25,
        yellowTo: 35,
        redFrom: 35,
        redTo: 50,
        minorTicks: 2
    };

    // Properties for LastHumidity graph
    scope.lastHumidityChartObject = {};
    scope.lastHumidityChartObject.type = "Gauge";

    // Methods for LastHumidity graph
    scope.lastHumidityChartObject.options = {
        width: 400,
        height: 120,
        redFrom: 0,
        redTo: 30,
        blueFrom: 75,
        blueTo: 100,
        minorTicks: 5
    };



}