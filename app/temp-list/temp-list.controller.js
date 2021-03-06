'use strict';

angular.module('TempServer').controller('TempListController', TempListController);

TempListController.$inject = ['$scope', '$filter', 'GetTempList', 'GetLastTemp'];

function TempListController(scope, filter, GetTempList, GetLastTemp) {

    // TempList graph
    scope.tempList = GetTempList.query({}, function (content) {
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
        } else {
            scope.lastTemp.dateTime = new Date(scope.tempListChartObject.data.rows[selectedItem.row].c[0].seconds * 1000);
            scope.lastTemp.temperature = scope.tempListChartObject.data.rows[selectedItem.row].c[1].v;
            scope.lastTemp.humidity = scope.tempListChartObject.data.rows[selectedItem.row].c[2].v;
        }
    }

    function initList(tempList) {
        scope.tempListChartObject.type = "LineChart";
        scope.tempListChartObject.displayed = false;
        tempList.forEach(function(temp) {
            rows.push({
                "c": [{
                    "v": filter('date')(temp.dateTime.seconds * 1000, 'dd/MM/yy hh:mm'),
                    "seconds": temp.dateTime.seconds
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
                type: "string"
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
    scope.lastTemp = GetLastTemp.query({}, function (content) {
        content.dateTime = new Date(content.dateTime.seconds * 1000);
    });
}