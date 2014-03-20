'use strict';

/* Controllers */

angular.module('myApp.controllers', []).controller('MyCtrl1', [ function() {

} ]).controller('MyCtrl2', [ function() {

} ]);

// app.controller('BrokenCtrl', [ function($scope, $http) {
// $scope.page = "History";
// $http.get('data/history.json').success(function(data) {
// $scope.history = data;
// });
// } ]);

function HistoryCtrl($scope, $http) {
	$scope.page = "History";
	$http.get('data/history.json').success(function(data) {
		$scope.history = data;
	});
}

function SessionCtrl($scope, $http) {
	$http.get('data/acct.json').success(function(data) {
		$scope.acct = data.acct;
		$scope.acctName = data.acctName;
	});
}
