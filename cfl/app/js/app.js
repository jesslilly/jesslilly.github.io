'use strict';

// Declare app level module which depends on filters, and services
angular.module(
		'myApp',
		[ 'ngRoute', 'myApp.filters', 'myApp.services', 'myApp.directives',
				'myApp.controllers' ]).config(
		[ '$routeProvider', function($routeProvider) {
			$routeProvider.when('/calc', {
				templateUrl : 'partials/calc.html',
				controller : 'CalcCtrl'
			});
			$routeProvider.otherwise({
				redirectTo : '/calc'
			});
		} ]);
