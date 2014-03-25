'use strict';

/* Controllers */

angular.module('myApp.controllers', []).controller('MyCtrl1', [ function() {

} ]).controller('MyCtrl2', [ function() {

} ]);

function SessionCtrl($scope, $http) {

}

function CalcCtrl($scope, $http) {
	$scope.numOldBulbs = 10;
	$scope.numHoursOn = 12;
	$scope.oldCostPerYr = 4.80;
	$scope.cflCostPerYr = 1.75;
	$scope.cflDollarPrice = 1.49;
}
