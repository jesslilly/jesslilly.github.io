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
	$scope.elecDollarsPerHour = (300 / 365 / 24); // $300 per year => per day
	$scope.cflDollarPrice = 4;
}
