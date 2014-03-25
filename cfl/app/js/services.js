'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).value('version', '0.1');

angular.module('historyServices', [ 'ngResource' ]).factory('History',
		function($resource) {
			return $resource('history/:customerId', {}, {
				query : {
					method : 'GET',
					params : {
						customerId : 'histories'
					},
					isArray : true
				}
			});
		});
