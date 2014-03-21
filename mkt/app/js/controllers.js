'use strict';

/* Controllers */

angular.module('myApp.controllers', []).controller('MyCtrl1', [ function() {

} ]).controller('MyCtrl2', [ function() {

} ]);

function SessionCtrl($scope, $http) {
	$http.get('data/acct.json').success(function(data) {
		$scope.acct = data.acct;
		$scope.acctName = data.acctName;
	});
}

function SettingsCtrl($scope, $http) {
	$scope.page = "Settings";
	$http.get('data/settings.json').success(function(data) {
		$scope.settings = data;
	});
	$scope.providers = [ {
		name : 'Google AdSense',
		value : 'adSense'
	}, {
		name : 'Yahoo! Network',
		value : 'yahoo'
	}, {
		name : 'AOL Advertising',
		value : 'aol'
	} ];
	$scope.provider = $scope.providers[0];

	$scope.levels = [ {
		name : 'basic',
		value : 'basic'
	}, {
		name : 'standard',
		value : 'standard'
	}, {
		name : 'premium',
		value : 'premium'
	} ];
	$scope.level = $scope.levels[1];
}

function HistoryCtrl($scope, $http) {
	$scope.page = "History";
	$http.get('data/history.json').success(function(data) {
		$scope.history = data;
	});
}
