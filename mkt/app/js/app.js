'use strict';

// Declare app level module which depends on filters, and services
angular.module(
		'myApp',
		[ 'ngRoute', 'myApp.filters', 'myApp.services', 'myApp.directives',
				'myApp.controllers' ]).config(
		[ '$routeProvider', function($routeProvider) {
			$routeProvider.when('/hello', {
				templateUrl : 'partials/hello.html',
				controller : 'MyCtrl1'
			});
			$routeProvider.when('/settings', {
				templateUrl : 'partials/settings.html',
				controller : 'SettingsCtrl'
			});
			$routeProvider.when('/history', {
				templateUrl : 'partials/history.html',
				controller : 'HistoryCtrl'
			});
			$routeProvider.when('/faq', {
				templateUrl : 'partials/faq.html',
				controller : 'MyCtrl1'
			});
			$routeProvider.otherwise({
				redirectTo : '/view1'
			});
		} ]);
